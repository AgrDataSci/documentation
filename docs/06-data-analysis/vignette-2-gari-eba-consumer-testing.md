---
sidebar_position: 3
---

```{r setup, include=FALSE} 
knitr::opts_chunk$set(warning = FALSE, message = FALSE) 
```

# Example workflow - Consumer preference of cassava gari-eba

Here, I present a workflow to analyze data from a consumer preference trial executed in Nigeria and Cameroon by the International Institute of Tropical Agriculture (IITA) under the RTBFoods project (https://rtbfoods.cirad.fr). Consumer testing was carried out with 1,000 participants in 2022 in Cameroon and Nigeria using the tricot approach [@deSousa2024]. Diverse consumers in villages, towns, and cities evaluated the overall acceptability of gari-eba made from 13 cassava (*Manihot esculenta* Crantz) genotypes. Apart from the overall preference of the samples, the following traits were evaluated for eba based on triangulated insights obtained through earlier surveys and participatory work in the three areas: Nigeria (Osun and Benue States): color, smoothness, moldability, stretchability, and taste. Cameroon (Littoral zone): color, odor, taste, firmness, and stretchability.

Traits in common are color, taste, and stretchability. The results of this study were published by Olaosebikan et al. (2023)[@Olaosebikan2023], and a deeper analysis for the Nigerian subset, linking the consumer data to laboratory instrumental metrics, was published by Alamu et al. (2023)[@EmmanuelAlamu2023]. The present vignette does not intend to replicate the results of these studies. Instead, it presents an alternative workflow to what was developed in the study. For the replication data on Olaosebikan et al. (2023), please visit https://github.com/AgrDataSci/rtbfoods-consumer-testing.

The `cassava` data is a data frame with 1,000 observations and 27 variables, which are described in the data documentation with `?cassava`. This vignette will require the packages PlackettLuce [@Turner2020], ClimMobTools [@ClimMobTools], ggplot2 [@ggplot2], and patchwork [@patchwork].

# Read the data and select traits

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

Here, we select the columns with complete cases to perform the analysis. The remaining traits (tested in both studies) are color, stretchability, taste, and overall preference.

``` {r select, message = FALSE, eval = TRUE, echo = TRUE}
keep = unlist(lapply(dat[1:ncol(dat)], function(x) sum(is.na(x))))

keep = keep == 0

dat = dat[, keep]

names(dat)

```


The tricot data, in its original form, has a standard structure for storing the ranking data in the form of two columns with the trait name and the value for the best and the worst ranking (e.g., overall_pos, overall_neg). The function `getTraitList()` from the `ClimMobTools` package runs through the columns in the data to identify this structure and validates the rankings. The output is a list with the identified rankings, their strings in the dataset, a vector with the validated rankings, and the trait name. In the cassava dataset, the pattern for the best and worst rankings is `c("_pos", "_neg")`. We input this to the function `getTraitList()` using the argument `pattern =`.

``` {r traitlist, message = FALSE, eval = TRUE, echo = TRUE}
# extract list of traits from the data
trait_list = getTraitList(dat, pattern = c("_pos", "_neg"))

# trait names extracted from the function 
traits = unlist(lapply(trait_list, function(x) x$trait_label))

# clean trait names and put them title case
traits = gsub("(^|[[:space:]])([[:alpha:]])", "\\1\\U\\2", traits, perl = TRUE)

traits
```


Here, we perform some data preparation by defining the column indices for the variables with the cassava sample names, the names of varieties tested in the study, and the position of "Overall" within the trait list. We set Obasanjo-2 as the check variety.

``` {r prep, message = FALSE, eval = TRUE, echo = TRUE}
pack = c("option_a", "option_b", "option_c")

items = sort(unique(unlist(dat[pack])))

check = "Obasanjo-2"

ov = which(traits %in% "Overall")

```

# Assess the full data

The Plackett-Luce model [@Turner2020] is used to analyze the data. First, we transform the data into a PlackettLuce object using the function `rank_tricot()`. We use `lapply()` to apply the function to the list of traits.

``` {r rank, message = FALSE, eval = TRUE, echo = TRUE}
R = lapply(trait_list, function(x) {
  rank_tricot(dat, 
              items = pack, 
              input = x$string,
              validate.rankings = TRUE)
})
```

To fit the model, we use the function `PlackettLuce()` from the package 'PlackettLuce' [@Turner2020], also using `lapply()`. This returns a list of models, one per trait. First, we focus on the overall preference. We use the function `plot()` to visualize the Plackett-Luce estimates as *log-worth* parameters using the argument `log = TRUE`. The argument `levels =` establishes the order of the varieties in the plot. 


``` {r plfit, message = FALSE, eval = TRUE, echo = TRUE}
mod = lapply(R, PlackettLuce)

plot(mod[[ov]],
     ref = check,
     log = TRUE,
     levels = rev(items))

```

The plot shows that the varieties TMS6, Sape and TMEB1 outperform Obasanjo-2 for overall preference. We use the function `reliability()` to identify the improvement achieved by these varieties against reference Obasanjo-2 [@eskridge_1992]. The function returns a data frame with the reliability estimates, where values above 0.5 indicates that the variety outperforms the reference. We plot these results using `ggplot()`.

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


The reliability estimates show an improvement in overall preference of 32% for TMS6, 18% for Sape and 8% for TMEB1. 

So far, we have focused solely on the overall preference. However, there are other traits to assess. The function `worth_plot()` can be used to visually analyze and compare variety performance across different traits. The values represented in a worth map are *log-worth* estimates. The function can be used with `ggplot2` functions to improve the plot.

``` {r worth, message = FALSE, eval = TRUE, echo = TRUE}
worth_map(mod, labels = traits) +
  labs(x = "", y = "") +
  scale_fill_distiller(palette = "BrBG", 
                       direction = 1, 
                       na.value = "white", 
                       name = "")
```

The worth map confirms the superiority of TMS6, Sape and TMEB1 across the traits, but also presents Madame among the top varieties for color. We will return to this analysis later, but for now, let us examine the data from the perspective of different groups to consider heterogeneity in the participants' evaluations, as proposed by van Etten et al. (2023) [@vanEtten2023].


# Participants' heterogeneity

We will focus on two covariates to analyze the data: gender and country. The function `likelihood_ratio()` is used to test which of these covariates can provide distinguishable rankings within the groups. 

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

The likelihood-ratio test indicates that sub-setting the data by country provides statistically different rankings. This test can also be used to validate more complex groupings, such as those generated by cluster analysis or farmers' typologies, which include a diverse set of variables (e.g., socio-economic and agroecological), as proposed by Voss et al. (2024) [@Voss2024]. For simplicity, we focus here only on the variable "country."

Now, returning to the worth map analysis, we can visualize the performance of the varieties within the groups. We iterate over the groups by sub-setting the data in a loop. Within the loop, we create the plots and store them in a list. Finally, we use the `patchwork` package to display the two worth maps.

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

The segmented analysis reveals contrasting results compared to the previous analysis using the full dataset. It highlights the superiority of TMS6 and TMEB1 in Nigeria, and Game Changer and Sape in Cameroon. This approach provides a visual method to select the best variety overall for each group. To account for all traits in a data-driven manner when selecting varieties, I propose a selection index approach. This method calculates weighted estimates and derives a selection score that represents the overall performance of the varieties across all traits.

Suppose we have three varieties with standardized probabilities for each trait:

| Variety    | Yield (0.5) | Marketability (0.3) | Tolerance to drought (0.2) | Selection Index Score      |
|------------|--------------------------|---------------------|-----------------------|----------------------------|
| Variety 1  | 0.8                      | 0.6                 | 0.7                   | (0.8*0.5) + (0.6*0.3) + (0.7*0.2) = **0.71** |
| Variety 2  | 0.7                      | 0.8                 | 0.5                   | (0.7*0.5) + (0.8*0.3) + (0.5*0.2) = **0.68** |
| Variety 3  | 0.6                      | 0.7                 | 0.9                   | (0.6*0.5) + (0.7*0.3) + (0.9*0.2) = **0.70** |

 
Here, *Variety 1* would have the highest selection index score, making it a top choice based on this weighted approach.

For this example, I arbitrarily set the weights for each gari-eba trait as follows: color = 0.2, stretchability = 0.2, taste = 0.3, and overall = 0.3. We iterate over the groups in a loop, storing the model coefficients in a data frame for visualization with `ggplot`.

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

The selection score indicates that the superior varieties for Nigeria are TMS6, TMEB1, and TMS3, while for Cameroon, the varieties Game Changer, Sape, and Madame demonstrate superior performance. This approach contrasts with the previous analysis based solely on overall preference and the visualization provided by the worth map. By considering the heterogeneity of consumer preferences, it enables the identification of the best varieties for specific groups and market segments.

# Conclusion

This vignette demonstrates a workflow for analyzing consumer preference trial data using the tricot approach. By integrating innovative visualization techniques, we explored the performance of cassava varieties across multiple traits and participant groups in Nigeria and Cameroon. The analysis highlights the utility of worth maps and selection scores in identifying superior varieties for specific contexts.

In this study, we identified TMS6, TMEB1, and TMS3 as top-performing varieties in Nigeria, while Game Changer, Sape, and Madame stood out in Cameroon. The selection index approach further enabled the integration of weighted estimates for traits such as color, stretchability, taste, and overall preference, providing a holistic evaluation of variety performance. This flexible approach allows for customization of weights to align with different stakeholder priorities or objectives.

Additionally, the application of subgroup analysis, using country as a covariate, demonstrated the potential to uncover heterogeneity in preferences and tailor variety recommendations. This method could be extended to more complex groupings, such as those based on cluster analyses or farmer typologies incorporating socio-economic and agroecological variables.

Overall, this vignette underscores the value of combining participatory approaches, advanced statistical models, and visualization tools for robust variety selection. By applying these methods, researchers and practitioners can make informed decisions to improve crop variety adoption and enhance food systems in diverse agricultural contexts.

# References

