---
sidebar_position: 3
title: "Préférences des consommateurs pour le gari-eba de manioc"
---

```{r setup, include=FALSE} 
knitr::opts_chunk$set(warning = FALSE, message = FALSE) 
```

# Introduction

Ici, je présente un flux de travail pour analyser les données d'un essai de préférence des consommateurs réalisé au Nigeria et au Cameroun par l'Institut international d'agriculture tropicale (IITA) dans le cadre du projet RTBFoods (https://rtbfoods.cirad.fr). Les tests consommateurs ont été réalisés en 2022 au Cameroun et au Nigeria auprès de 1 000 participants en utilisant l'approche tricot [@deSousa2024]. Divers consommateurs, dans les villages, les villes et les cités, ont évalué l'acceptabilité globale du gari-eba fabriqué à partir de 13 génotypes de manioc (*Manihot esculenta* Crantz). 

En plus de la préférence globale des échantillons, les traits suivants ont été évalués pour l'eba, basés sur des informations triangulées obtenues lors d'enquêtes antérieures et de travaux participatifs dans les trois zones : 
- **Nigeria (États d'Osun et de Benue)** : couleur, douceur, malléabilité, élasticité et goût.
- **Cameroun (zone littorale)** : couleur, odeur, goût, fermeté et élasticité.

Les traits communs sont la couleur, le goût et l'élasticité. Les résultats de cette étude ont été publiés par Olaosebikan et al. (2023) [@Olaosebikan2023], et une analyse approfondie pour le sous-ensemble nigérian, reliant les données des consommateurs aux métriques instrumentales de laboratoire, a été publiée par Alamu et al. (2023) [@EmmanuelAlamu2023]. La présente vignette ne vise pas à reproduire les résultats de ces études. Elle propose plutôt un flux de travail alternatif à celui développé dans l'étude. Pour accéder aux données de réplication d'Olaosebikan et al. (2023), veuillez visiter https://github.com/AgrDataSci/rtbfoods-consumer-testing.

Les données `cassava` sont un cadre de données contenant 1 000 observations et 27 variables, décrites dans la documentation des données avec `?cassava`. Cette vignette nécessite les packages PlackettLuce [@Turner2020], ClimMobTools [@ClimMobTools], ggplot2 [@ggplot2] et patchwork [@patchwork].

# Lecture des données et sélection des traits


``` {r starting, message = FALSE, eval = TRUE, echo = TRUE}
library("gosset")
library("ClimMobTools")
library("PlackettLuce")
library("ggplot2")
library("patchwork")

data("cassava", package = "gosset")

dat = cassava

head(dat[, 1:11])

```

Ici, nous sélectionnons les colonnes contenant des cas complets pour effectuer l'analyse. Les traits restants (testés dans les deux études) sont la couleur, l'élasticité, le goût et la préférence globale.

``` {r select, message = FALSE, eval = TRUE, echo = TRUE}
keep = unlist(lapply(dat[1:ncol(dat)], function(x) sum(is.na(x))))

keep = keep == 0

dat = dat[, keep]

names(dat)

```


Les données tricot, sous leur forme originale, possèdent une structure standard pour stocker les données de classement sous la forme de deux colonnes contenant le nom du trait et les valeurs pour le meilleur et le pire classement (par exemple, `overall_pos`, `overall_neg`). La fonction `getTraitList()` du package `ClimMobTools` parcourt les colonnes des données pour identifier cette structure et valide les classements. 

Le résultat est une liste contenant :
- Les classements identifiés,
- Leurs chaînes correspondantes dans l'ensemble de données,
- Un vecteur des classements validés,
- Et le nom du trait.

Dans l'ensemble de données de manioc, le modèle pour les meilleurs et pires classements est `c("_pos", "_neg")`. Nous entrons ce modèle dans la fonction `getTraitList()` en utilisant l'argument `pattern =`.

``` {r traitlist, message = FALSE, eval = TRUE, echo = TRUE}
# extract list of traits from the data
trait_list = getTraitList(dat, pattern = c("_pos", "_neg"))

# trait names extracted from the function 
traits = unlist(lapply(trait_list, function(x) x$trait_label))

# clean trait names and put them title case
traits = gsub("(^|[[:space:]])([[:alpha:]])", "\\1\\U\\2", traits, perl = TRUE)

traits
```


Ici, nous effectuons une préparation des données en définissant les indices des colonnes pour les variables contenant les noms des échantillons de manioc, les noms des variétés testées dans l'étude, ainsi que la position de "Overall" dans la liste des traits. Nous définissons "Obasanjo-2" comme variété de référence.

``` {r prep, message = FALSE, eval = TRUE, echo = TRUE}
pack = c("option_a", "option_b", "option_c")

items = sort(unique(unlist(dat[pack])))

check = "Obasanjo-2"

ov = which(traits %in% "Overall")

```

# Évaluation des données complètes

Le modèle Plackett-Luce [@Turner2020] est utilisé pour analyser les données. Tout d'abord, nous transformons les données en un objet PlackettLuce à l'aide de la fonction `rank_tricot()`. Nous utilisons `lapply()` pour appliquer la fonction à la liste des traits.

``` {r rank, message = FALSE, eval = TRUE, echo = TRUE}
R = lapply(trait_list, function(x) {
  rank_tricot(dat, 
              items = pack, 
              input = x$string,
              validate.rankings = TRUE)
})
```

Pour ajuster le modèle, nous utilisons la fonction `PlackettLuce()` du package 'PlackettLuce' [@Turner2020], en utilisant également `lapply()`. Cela renvoie une liste de modèles, un par trait. Tout d'abord, nous nous concentrons sur la préférence globale. Nous utilisons la fonction `plot()` pour visualiser les estimations Plackett-Luce en tant que paramètres de *log-worth* en utilisant l'argument `log = TRUE`. L'argument `levels =` détermine l'ordre des variétés dans le graphique.


``` {r plfit, message = FALSE, eval = TRUE, echo = TRUE}
mod = lapply(R, PlackettLuce)

plot(mod[[ov]],
     ref = check,
     log = TRUE,
     levels = rev(items))

```

Le graphique montre que les variétés TMS6, Sape et TMEB1 surpassent Obasanjo-2 en termes de préférence globale. Nous utilisons la fonction `reliability()` pour identifier l'amélioration obtenue par ces variétés par rapport à la référence Obasanjo-2 [@eskridge_1992]. La fonction renvoie un tableau de données contenant les estimations de fiabilité, où des valeurs supérieures à 0,5 indiquent que la variété dépasse la référence. Nous visualisons ces résultats en utilisant `ggplot()`.

``` {r reliability, message = FALSE, eval = TRUE, echo = TRUE}
rel = reliability(mod[[ov]], ref = check)

rel$improvement = round((rel$reliability / 0.5 - 1), 2)

rel = rel[order(rel$improvement), ]

rel$item = factor(rel$item, levels = rel$item)

ggplot(data = rel,
       aes(x = improvement, 
           y = item,
           fill = "white")) +
  geom_bar(stat = "identity",
           width = 0.7,
           position = "dodge", 
           show.legend = FALSE) +
  scale_fill_manual(values = "#5aae61") +
  geom_vline(xintercept = 0,
             colour = "grey40",
             linewidth = 1) +
  theme_classic() +
  labs(x = "Probability of outperforming",
       y = "")

```

Les estimations de fiabilité montrent une amélioration de la préférence globale de 32 % pour TMS6, 18 % pour Sape et 8 % pour TMEB1.

Jusqu'à présent, nous nous sommes concentrés uniquement sur la préférence globale. Cependant, d'autres traits doivent être évalués. La fonction `worth_plot()` peut être utilisée pour analyser et comparer visuellement les performances des variétés à travers différents traits. Les valeurs représentées dans une carte des valeurs (*worth map*) sont des estimations de *log-worth*. Cette fonction peut être utilisée avec les fonctions de `ggplot2` pour améliorer le graphique.

``` {r worth, message = FALSE, eval = TRUE, echo = TRUE}
worth_map(mod, labels = traits) +
  labs(x = "", y = "") +
  scale_fill_distiller(palette = "BrBG", 
                       direction = 1, 
                       na.value = "white", 
                       name = "")
```

La carte des valeurs (*worth map*) confirme la supériorité des variétés TMS6, Sape et TMEB1 à travers les différents traits, mais présente également Madame parmi les meilleures variétés pour la couleur. Nous reviendrons sur cette analyse plus tard, mais pour l'instant, examinons les données du point de vue de différents groupes afin de prendre en compte l'hétérogénéité des évaluations des participants, comme proposé par van Etten et al. (2023) [@vanEtten2023].

# Hétérogénéité des participants

Nous nous concentrerons sur deux covariables pour analyser les données : le genre et le pays. La fonction `likelihood_ratio()` est utilisée pour tester laquelle de ces covariables peut fournir des classements distincts au sein des groupes.


``` {r llr, message = FALSE, eval = TRUE, echo = TRUE}
# by gender
llr1 = lapply(R, function(x){
  likelihood_ratio(x, split = dat$gender)
})

llr1 = do.call("rbind", llr1)

llr1$trait = traits

llr1

# by country
llr2 = lapply(R, function(x){
  likelihood_ratio(x, split = dat$country)
})

llr2 = do.call("rbind", llr2)

llr2$trait = traits

llr2 

```

Le test du rapport de vraisemblance (*likelihood-ratio test*) indique que le découpage des données par pays fournit des classements statistiquement différents. Ce test peut également être utilisé pour valider des regroupements plus complexes, tels que ceux générés par une analyse de cluster ou des typologies d'agriculteurs, qui incluent un ensemble diversifié de variables (par exemple, socio-économiques et agroécologiques), comme proposé par Voss et al. (2024) [@Voss2024]. Par souci de simplicité, nous nous concentrons ici uniquement sur la variable "pays".

Revenons maintenant à l'analyse de la carte des valeurs (*worth map*). Nous pouvons visualiser les performances des variétés au sein des groupes. Nous itérons sur les groupes en segmentant les données dans une boucle. Au sein de cette boucle, nous créons les graphiques et les stockons dans une liste. Enfin, nous utilisons le package `patchwork` pour afficher les deux cartes des valeurs.

``` {r worth2, message = FALSE, eval = TRUE, echo = TRUE}

# get the slice variable as a vector
slice = dat$country

# and get the unique values
slice_lvs = unique(slice)


trait_plot = list()

for (i in seq_along(slice_lvs)) {
  
  # fit the model also applying the slice
  mod_i = lapply(R, function(x) {
    PlackettLuce(x[slice == slice_lvs[i], ])
  })
  
  # plot the worth map
  trait_plot[[i]] = worth_map(mod_i, 
            labels = traits) +
    labs(x = "", 
         y = "",
         title = slice_lvs[i]) +
    scale_fill_distiller(palette = "BrBG", 
                         direction = 1, 
                         na.value = "white", 
                         name = "")
  
    
}

# plot the two maps using patchwork
trait_plot[[1]] + trait_plot[[2]] + plot_layout(ncol = 1)

```

L'analyse segmentée révèle des résultats contrastés par rapport à l'analyse précédente utilisant l'ensemble complet des données. Elle met en évidence la supériorité de TMS6 et TMEB1 au Nigeria, et de Game Changer et Sape au Cameroun. Cette approche offre une méthode visuelle pour sélectionner la meilleure variété globalement pour chaque groupe. Pour tenir compte de tous les traits de manière axée sur les données lors de la sélection des variétés, je propose une approche basée sur un indice de sélection. Cette méthode calcule des estimations pondérées et génère un score de sélection qui représente la performance globale des variétés sur tous les traits.

Supposons que nous ayons trois variétés avec des probabilités standardisées pour chaque trait :

| Variété     | Rendement (0.5) | Commercialisation (0.3) | Tolérance à la sécheresse (0.2) | Score d'indice de sélection |
|-------------|-----------------|--------------------------|----------------------------------|-----------------------------|
| Variété 1   | 0.8             | 0.6                      | 0.7                              | (0.8*0.5) + (0.6*0.3) + (0.7*0.2) = **0.71** |
| Variété 2   | 0.7             | 0.8                      | 0.5                              | (0.7*0.5) + (0.8*0.3) + (0.5*0.2) = **0.68** |
| Variété 3   | 0.6             | 0.7                      | 0.9                              | (0.6*0.5) + (0.7*0.3) + (0.9*0.2) = **0.70** |

Ici, *Variety 1* aurait le score d'indice de sélection le plus élevé, en faisant le meilleur choix basé sur cette approche pondérée.

Dans cet exemple, j'ai arbitrairement défini les poids pour chaque trait de gari-eba comme suit : couleur = 0.2, élasticité = 0.2, goût = 0.3 et préférence globale = 0.3. Nous itérons sur les groupes dans une boucle, en stockant les coefficients du modèle dans un tableau de données pour une visualisation avec `ggplot`.

``` {r selection, message = FALSE, eval = TRUE, echo = TRUE}

weights = c(0.20, 0.20, 0.30, 0.30)

select = data.frame()

for (i in seq_along(slice_lvs)) {
  
  # fit the model
  mod_i = lapply(R, function(x) {
    PlackettLuce(x[slice == slice_lvs[i], ])
  })
  
  # extract the coefficients
  coeffs = lapply(mod_i, function(x) {coefficients(x, log = FALSE)})
  
  coeffs = do.call("rbind", coeffs)
  
  # apply the weights within the coefficients
  coeffs = apply(coeffs, 2, function(x) {x * weights})
  
  coeffs = colSums(coeffs)
  
  # put it in a data.frame
  select_i = data.frame(item = names(coeffs),
                        slice = slice_lvs[i],
                        score = as.vector(coeffs))
  
  select = rbind(select, select_i)
  
  
}


ggplot(data = select,
       aes(x = score, 
           y = item,
           fill = slice)) +
  geom_bar(stat = "identity",
           width = 0.7,
           position = "dodge") +
  scale_fill_manual(values = c("#d73027", "#4575b4")) +
  geom_vline(xintercept = mean(select$score),
             colour = "grey40",
             linewidth = 1) +
  theme_classic() +
  theme(legend.title = element_blank(),
        legend.position = "bottom") +
  labs(x = "Selection score",
       y = "")

```

Le score de sélection indique que les variétés supérieures pour le Nigeria sont TMS6, TMEB1 et TMS3, tandis qu'au Cameroun, les variétés Game Changer, Sape et Madame montrent une performance supérieure. Cette approche contraste avec l'analyse précédente basée uniquement sur la préférence globale et la visualisation fournie par la carte des valeurs (*worth map*). En tenant compte de l'hétérogénéité des préférences des consommateurs, elle permet d'identifier les meilleures variétés pour des groupes spécifiques et des segments de marché.

# Conclusion

Cette vignette démontre un flux de travail pour analyser les données des essais de préférence des consommateurs en utilisant l'approche tricot. En intégrant des techniques de visualisation innovantes, nous avons exploré la performance des variétés de manioc sur plusieurs traits et groupes de participants au Nigeria et au Cameroun. L'analyse met en évidence l'utilité des cartes des valeurs (*worth maps*) et des scores de sélection pour identifier les variétés supérieures dans des contextes spécifiques.

Dans cette étude, nous avons identifié TMS6, TMEB1 et TMS3 comme les variétés les plus performantes au Nigeria, tandis que Game Changer, Sape et Madame se sont distinguées au Cameroun. L'approche de l'indice de sélection a également permis d'intégrer des estimations pondérées pour des traits tels que la couleur, l'élasticité, le goût et la préférence globale, offrant une évaluation holistique de la performance des variétés. Cette approche flexible permet une personnalisation des poids pour s'adapter aux priorités ou objectifs des différentes parties prenantes.

En outre, l'application de l'analyse des sous-groupes, en utilisant le pays comme covariable, a démontré le potentiel de révéler l'hétérogénéité des préférences et de personnaliser les recommandations de variétés. Cette méthode pourrait être étendue à des regroupements plus complexes, tels que ceux basés sur des analyses de cluster ou des typologies d'agriculteurs incorporant des variables socio-économiques et agroécologiques.

Dans l'ensemble, cette vignette souligne la valeur de combiner des approches participatives, des modèles statistiques avancés et des outils de visualisation pour une sélection robuste des variétés. En appliquant ces méthodes, les chercheurs et les praticiens peuvent prendre des décisions éclairées pour améliorer l'adoption des variétés de cultures et renforcer les systèmes alimentaires dans des contextes agricoles diversifiés.

# Références


