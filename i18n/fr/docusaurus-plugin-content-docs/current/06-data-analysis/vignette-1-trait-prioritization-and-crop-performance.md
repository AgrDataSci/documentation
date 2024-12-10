---
sidebar_position: 2
title: "Intégration des données générées par les agriculteurs et des données agroclimatiques pour la sélection de variétés de cultures"
---

# Introduction

Dans cet exemple, nous démontrons un flux de travail possible pour évaluer les performances des variétés de cultures en utilisant des données décentralisées d'essais sur le terrain générées avec l'approche tricot [@deSousa2024]. Nous utilisons le jeu de données `nicabean`, qui a été généré à partir d'essais sur le terrain décentralisés de variétés de haricot commun (*Phaseolus vulgaris* L.) au Nicaragua sur cinq saisons (entre 2015 et 2016). Suivant l'approche tricot, les agriculteurs ont testé trois variétés de haricot commun attribuées aléatoirement sur leurs exploitations comme blocs incomplets de taille trois (parmi un ensemble de 10 variétés). Les agriculteurs ont évalué laquelle des trois variétés présentait les meilleures et pires performances pour huit traits (vigueur, architecture, résistance aux ravageurs, résistance aux maladies, tolérance à la sécheresse, rendement, qualité marchande et goût). De plus, ils ont fourni leur appréciation globale des variétés, c'est-à-dire celle ayant les meilleures et pires performances globales, en tenant compte de tous les traits.

Ici, nous utilisons le modèle Plackett-Luce, proposé conjointement par Luce (1959) [@luce_individual_1959] et Plackett (1975) [@Plackett]. Ce modèle estime la probabilité qu'une variété surpasse toutes les autres (valeur estimée) pour un trait donné, en se basant sur l'axiome de Luce [@luce_individual_1959]. Le modèle est implémenté en R par Turner et al. (2020) avec le package PlackettLuce [@Turner2020].

Le jeu de données `nicabean` est une liste contenant deux cadres de données. Le premier, `trial`, contient les données d'essai avec les évaluations des agriculteurs classées de 1 à 3, 1 étant la variété la mieux classée et 3 la moins bien classée pour un trait donné et un bloc incomplet. Ces classements ont été transformés à partir des classements tricot (où les participants indiquent la meilleure et la pire) en classements ordinaux à l'aide de la fonction `rank_tricot()`. Le second cadre de données, `covar`, contient les covariables associées aux parcelles d'essais sur le terrain et aux agriculteurs. Cet exemple nécessite les packages PlackettLuce, climatrends, chirps et ggplot2.


``` {r starting, message = FALSE, eval = TRUE, echo = TRUE}
library("gosset")
library("PlackettLuce")
library("climatrends")
library("chirps")
library("ggplot2")

data("nicabean", package = "gosset")

dat = nicabean$trial

covar = nicabean$covar

traits = unique(dat$trait)

dat

```

Pour commencer l'analyse, nous transformons les classements ordinaux en classements Plackett-Luce (une matrice clairsemée) à l'aide de la fonction rank_numeric(). Nous itérons sur les traits et ajoutons les classements à une liste appelée R. Étant donné que les variétés sont classées par ordre croissant (1 étant la meilleure et 3 la moins bonne), nous utilisons l'argument ascending = TRUE.

```{r rankings, message = FALSE, eval = TRUE, echo = TRUE}
R = vector(mode = "list", length = length(traits))

for (i in seq_along(traits)) {

  dat_i = subset(dat, dat$trait == traits[i])

  R[[i]] = rank_numeric(data = dat_i,
                         items = "item",
                         input = "rank",
                         id = "id",
                         ascending = TRUE)
}

```

# Facteurs déterminants de l'appréciation globale des agriculteurs

À l'aide de la fonction `kendallTau()`, nous pouvons calculer le coefficient de Kendall tau ($\tau$) [@kendall_1938] pour identifier la corrélation entre l'appréciation globale des agriculteurs et les autres traits évalués dans l'essai. 

Cette approche peut être utilisée, par exemple, pour analyser les facteurs déterminants des choix des agriculteurs ou pour prioriser les traits à tester lors de la prochaine étape des essais tricot (par exemple, une version simplifiée de tricot avec au maximum quatre traits à évaluer). 

Nous utilisons l'appréciation globale comme trait de référence et comparons les valeurs de Kendall tau avec celles des huit autres traits.


```{r kendall1, message=FALSE, eval=TRUE, echo=TRUE}
baseline = which(grepl("OverallAppreciation", traits))

kendall = lapply(R[-baseline], function(X){
  kendallTau(x = X, y = R[[baseline]])
})

kendall = do.call("rbind", kendall)

kendall$trait = traits[-baseline]
```

La corrélation de Kendall indique que les agriculteurs ont priorisé les traits suivants lors de l'évaluation de l'appréciation globale : le rendement ($\tau$ = 0.749), le goût ($\tau$ = 0.653) et la qualité marchande ($\tau$ = 0.639).


```{r kendall2, message=FALSE, eval=TRUE, echo=FALSE}

kendall = kendall[,c(5, 1:4)]
kendall[,2:4] = lapply(kendall[,2:4], function(x) round(x, 3))

kendall[,5] = formatC(kendall[,5], format = "e")

kendall

```

# Performance des variétés selon les traits

Pour chaque trait, nous ajustons un modèle Plackett-Luce en utilisant la fonction `PlackettLuce()` du package portant le même nom. Cela nous permet de continuer à analyser les données des essais en utilisant d'autres fonctions disponibles dans le package gosset.


```{r PLmodel, message=FALSE, eval=TRUE, echo=TRUE}

mod = lapply(R, PlackettLuce)

```

La fonction `worth_map()` offre un outil visuel pour évaluer et comparer les performances des variétés selon différents traits. Les valeurs représentées dans une carte de valeur (*worth map*) sont des estimations de *log-worth*. 

Du point de vue d’un sélectionneur ou d’un développeur de produits, la fonction `worth_map()` est un outil précieux pour identifier les performances des variétés selon plusieurs traits et sélectionner des matériaux pour les croisements.

```{r worthmap, message=FALSE, eval=TRUE, echo=TRUE}
worth_map(mod[-baseline],
          labels = traits[-baseline],
          ref = "Amadeus 77") +
  labs(x = "Variety",
       y = "Trait")
```

# L'effet des précipitations sur le rendement

Pour examiner l'effet des facteurs climatiques sur le rendement, nous intégrons des covariables agroclimatiques dans un modèle d'arbre Plackett-Luce. Par souci de simplicité, nous utilisons les précipitations totales (Rtotal) dérivées des données CHIRPS [@Funk2015], accessibles en R via le package `chirps` [@chirps]. D'autres covariables, telles que la température, peuvent également être intégrées dans un arbre Plackett-Luce en utilisant des packages comme `ag5Tools` [@ag5tools] ou `nasapower` [@nasapower], comme proposé dans les études de van Etten et al. (2019) [@vanEtten2019], de Sousa et al. (2021) [@deSousa2021] et Brown et al. (2022) [@Brown2022].

Les données CHIRPS sont demandées via le package `chirps`, et les données renvoyées doivent être formatées sous forme de matrice. Notez que ce processus peut prendre plusieurs minutes.


```{r chirps, message=FALSE, eval=FALSE, echo=TRUE}
dates = c(min(covar[, "planting_date"]),
           max(covar[, "planting_date"]) + 70)

chirps = get_chirps(covar[, c("longitude","latitude")], 
                     dates = as.character(dates),
                     as.matrix = TRUE,
                     server = "ClimateSERV")
```

```{r chirps2, message=FALSE, eval=TRUE, echo=FALSE}

load("nicabean_chirps.rda")

```

Nous calculons les indices de précipitations pour la période allant de la date de plantation jusqu'aux 45 premiers jours de croissance des plantes à l'aide de la fonction `rainfall()` du package climatrends [@climatrends].

```{r chirps3, message=FALSE, eval=TRUE, echo=TRUE}
newnames = dimnames(chirps)[[2]]
newnames = gsub("chirps-v2.0.", "", newnames)
newnames = gsub("[.]", "-", newnames)

dimnames(chirps)[[2]] = newnames

rain = rainfall(chirps, day.one = covar$planting_date, span = 45)
```

Pour lier les classements aux covariables, ils doivent être convertis en un objet de type 'grouped_rankings'. Cela se fait à l'aide de la fonction `group()` du package PlackettLuce. Pour cet exemple, nous conservons uniquement les classements correspondant au rendement.

```{r grouped_ranking, message=FALSE, eval=TRUE, echo=TRUE}
yield = which(grepl("Yield", traits))

G = group(R[[yield]], index = 1:length(R[[yield]]))

head(G)

```

Nous ajustons maintenant un arbre Plackett-Luce avec les covariables climatiques.

```{r pltree, message=FALSE, eval=TRUE, echo=TRUE}
pldG = cbind(G, rain)

tree = pltree(G ~ Rtotal, data = pldG, alpha = 0.1)

print(tree)

```

Voici un exemple de graphique généré à l'aide de la fonction `plot()` du package gosset. Les fonctions `node_labels()`, `node_rules()` et `top_items()` peuvent être utilisées pour identifier les variables de séparation dans l'arbre, les règles appliquées à chaque séparation et les éléments les plus performants dans chaque nœud.

```{r node_info, message=FALSE, eval=TRUE, echo=TRUE}
node_labels(tree)

node_rules(tree)

top_items(tree, top = 3)
```

```{r node_info2, message=FALSE, eval=TRUE,echo=TRUE}
plot(tree, ref = "Amadeus 77")
```

# Fiabilité des variétés supérieures

La fonction `reliability()` peut être utilisée pour calculer les estimations de fiabilité [@eskridge_1992] des variétés de haricot commun évaluées dans chacun des nœuds résultants de l'arbre Plackett-Luce. Cela permet d'identifier les variétés ayant une probabilité plus élevée de surpasser une variété de référence (Amadeus 77). Par souci de simplicité, nous présentons uniquement les variétés ayant un score de fiabilité $\geq$ 0.5.


```{r rel1, message=FALSE, eval=FALSE, echo=TRUE}
reliability(tree, ref = "Amadeus 77")
```

```{r rel2, message=FALSE, eval=TRUE, echo=FALSE}

rel = reliability(tree, ref = "Amadeus 77")

rel = rel[rel$reliability >= 0.5, ]

rel = rel[c(1:5)]

rel

```

Les résultats montrent que trois variétés surpassent légèrement Amadeus 77 dans des conditions de culture plus sèches (Rtotal $\leq$ 193,82 mm), tandis que deux variétés présentent des performances de rendement supérieures dans des conditions de précipitations plus élevées (Rtotal $>$ 193,82 mm) par rapport à la référence. Cette approche est précieuse pour identifier des variétés supérieures adaptées à différentes populations cibles d'environnements.

Par exemple, la variété ALS 0532-6 affiche une performance faible dans le classement général du rendement, mais surpasse toutes les autres dans le sous-groupe avec des conditions de précipitations plus élevées. Combiner les classements avec des covariables socio-économiques pourrait encore améliorer l'identification des variétés supérieures pour des segments de marché spécifiques, comme proposé par Voss et al. (2024) [@Voss2024].

# Aller au-delà du rendement

Une approche plus complète pour évaluer les performances des variétés consiste à utiliser l'« appréciation globale », car ce trait est censé capturer les performances d'une variété non seulement pour le rendement, mais aussi pour tous les autres traits prioritaires pour les agriculteurs. Pour soutenir cette hypothèse, nous utilisons la fonction `compare()`, qui applique la méthode proposée par Bland et Altman (1986) [@MartinBland1986] pour évaluer l'accord entre deux mesures différentes. Ici, nous comparons l'appréciation globale et le rendement. Si les deux mesures sont en parfait accord, toutes les variétés devraient être centrées à 0 sur l'axe Y.


```{r compare, message=FALSE, echo=TRUE, eval=TRUE, out.width="50%"}
Overall = PlackettLuce(R[[baseline]])
Yield = PlackettLuce(R[[yield]])

compare(Overall, Yield) +
  labs(x = "Average log(worth)",
       y = "Difference (Overall appreciation - Yield)")
```

Le graphique ne révèle aucun accord complet entre l'appréciation globale et le rendement. Par exemple, la variété SX 14825-7-1 affiche une performance supérieure pour l'appréciation globale par rapport au rendement. En examinant les estimations de *log-worth* dans la carte de valeur (*worth map*), nous pouvons supposer que la performance supérieure de cette variété est probablement influencée par des traits tels que le goût, la qualité marchande et la résistance aux maladies. Cependant, ces aspects n'ont pas été pris en compte lors de l'évaluation basée uniquement sur le rendement.


# Conclusion

Cette vignette démontre un flux de travail détaillé pour analyser les données tricot dans le contexte des essais sur le terrain. En intégrant les évaluations des agriculteurs, les covariables agroclimatiques et les mesures de performance spécifiques aux traits, l'analyse fournit des informations précieuses sur les performances et l'adaptabilité des variétés de haricots dans divers contextes environnementaux et socio-économiques.

Les résultats montrent que, bien que le rendement reste un trait critique, d'autres traits tels que le goût, la qualité marchande et la résistance aux maladies influencent significativement l'appréciation globale des agriculteurs. L'utilisation de la corrélation de Kendall a mis en évidence les traits les plus fortement associés aux préférences des agriculteurs, tandis que les cartes de valeurs et les modèles Plackett-Luce ont fourni une visualisation claire des performances des variétés à travers les traits.

De plus, l'analyse des effets des précipitations à l'aide des arbres Plackett-Luce a souligné l'importance des facteurs agroclimatiques dans la détermination des performances relatives des variétés, permettant d'identifier les interactions génotype-environnement.

Cette vignette illustre comment des données décentralisées, des méthodes participatives et des modèles statistiques avancés peuvent travailler ensemble pour améliorer les stratégies de sélection et d'amélioration des cultures, en particulier pour le haricot commun et d'autres cultures.

# References

