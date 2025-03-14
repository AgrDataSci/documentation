---
sidebar_position: 2

---

# Example workflow - Integrating farmer-generated data and agro-climatic data for crop variety selection

In this example, we demonstrate a possible workflow to assess crop variety performance using decentralized on-farm testing data generated with the tricot approach [@deSousa2024]. We use the `nicabean` dataset, which was generated with decentralized on-farm trials of common bean (*Phaseolus vulgaris* L.) varieties in Nicaragua over five seasons (between 2015 and 2016). Following the tricot approach, farmers tested three randomly assigned varieties of common bean on their farms as incomplete blocks of size three (from a set of 10 varieties). Farmers assessed which of the three varieties had the best and worst performance in eight traits (vigor, architecture, resistance to pests, resistance to diseases, tolerance to drought, yield, marketability, and taste). Additionally, farmers provided their overall appreciation of the varieties, i.e., which variety had the best and worst performance overall, considering all the traits.

Here, we use the Plackett-Luce model, jointly proposed by Luce (1959) [@luce_individual_1959] and Plackett (1975) [@Plackett]. This model estimates the probability of one variety outperforming all others (worth) for a given trait, based on Luce's axiom [@luce_individual_1959]. The model is implemented in R by Turner et al. (2020) with the PlackettLuce package [@Turner2020].

The `nicabean` dataset is a list with two data frames. The first, `trial`, contains trial data with farmers’ evaluations ranked from 1 to 3, with 1 being the highest-ranked variety and 3 the lowest-ranked variety for a given trait and incomplete block. These rankings were previously transformed from tricot rankings (where participants indicate the best and worst) to ordinal rankings using the function `rank_tricot()`. The second data frame, `covar`, contains the covariates associated with the on-farm trial plots and farmers. This example requires the PlackettLuce, climatrends, chirps, and ggplot2 packages.

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

To begin the analysis, we transform the ordinal rankings into Plackett-Luce rankings (a sparse matrix) using the `rank_numeric()` function. We iterate over the traits and add the rankings to a list called R. Since the varieties are ranked in ascending order (1 being the highest and 3 the lowest), we use the argument `ascending = TRUE`.

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

# Drivers of farmers' overall appreciation

Using the function `kendallTau()`, we can compute the Kendall tau ($\tau$) coefficient [@kendall_1938] to identify the correlation between farmers' overall  appreciation and the other traits in the trial. This approach can be used, for example, to assess the drivers of farmers' choices or to prioritize traits for testing in the next stage of tricot trials (e.g., a simplified version of tricot with no more than four traits to assess). We use overall appreciation as the reference trait and compare the Kendall tau values with those of the other eight traits.

```{r kendall1, message=FALSE, eval=TRUE, echo=TRUE}
baseline = which(grepl("OverallAppreciation", traits))

kendall = lapply(R[-baseline], function(X){
  kendallTau(x = X, y = R[[baseline]])
})

kendall = do.call("rbind", kendall)

kendall$trait = traits[-baseline]
```

The Kendall correlation indicates that farmers prioritized the traits yield ($\tau$ = 0.749), taste ($\tau$ = 0.653), and marketability ($\tau$ = 0.639) when assessing overall appreciation.


```{r kendall2, message=FALSE, eval=TRUE, echo=FALSE}

kendall = kendall[,c(5, 1:4)]
kendall[,2:4] = lapply(kendall[,2:4], function(x) round(x, 3))

kendall[,5] = formatC(kendall[,5], format = "e")

kendall

```

# Performance of varieties across traits

For each trait, we fit a Plackett-Luce model using the function `PlackettLuce()` from the package of the same name. This enables us to continue analyzing the trial data using other functions available in the gosset package.

```{r PLmodel, message=FALSE, eval=TRUE, echo=TRUE}

mod = lapply(R, PlackettLuce)

```

The `worth_map()` function provides a visual tool to assess and compare variety performance across different traits. The values represented in a worth map are *log-worth* estimates. From a breeder or product developer perspective, the function `worth_map()` is a valuable tool for identifying variety performance across multiple traits and selecting crossing materials.

```{r worthmap, message=FALSE, eval=TRUE, echo=TRUE}
worth_map(mod[-baseline],
          labels = traits[-baseline],
          ref = "Amadeus 77") +
  labs(x = "Variety",
       y = "Trait")
```

# The effect of rainfall on yield

To examine the effect of climate factors on yield, we incorporate agro-climatic covariates into a Plackett-Luce tree model. For simplicity, we use total rainfall (Rtotal) derived from CHIRPS data [@Funk2015], accessed in R through the `chirps` package [@chirps]. Additional covariates, such as temperature, can also be incorporated into a Plackett-Luce tree using packages like `ag5Tools` [@ag5tools] or `nasapower` [@nasapower] as proposed by the studies of van Etten et al. (2019) [@vanEtten2019], de Sousa et al. (2021) [@deSousa2021] and Brown et al. (2022) [@Brown2022].

The CHIRPS data is requested via the `chirps` package, and the returned data should be formatted as a matrix. Note that this process may take several minutes to complete.

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

We compute the rainfall indices for the period from the planting date to the first 45 days of plant growth using the `rainfall()` function from the climatrends package [@climatrends].

```{r chirps3, message=FALSE, eval=TRUE, echo=TRUE}
newnames = dimnames(chirps)[[2]]
newnames = gsub("chirps-v2.0.", "", newnames)
newnames = gsub("[.]", "-", newnames)

dimnames(chirps)[[2]] = newnames

rain = rainfall(chirps, day.one = covar$planting_date, span = 45)
```

To link the rankings to covariates, they must be coerced into a 'grouped_rankings' object. This is done using the `group()` function from the PlackettLuce package. For this example, we retain only the rankings corresponding to yield.

```{r grouped_ranking, message=FALSE, eval=TRUE, echo=TRUE}
yield = which(grepl("Yield", traits))

G = group(R[[yield]], index = 1:length(R[[yield]]))

head(G)

```

Now we fit a Plackett-Luce tree with the climate covariates.

```{r pltree, message=FALSE, eval=TRUE, echo=TRUE}
pldG = cbind(G, rain)

tree = pltree(G ~ Rtotal, data = pldG, alpha = 0.1)

print(tree)

```

The following is an example of the plot generated using the `plot()` function in the gosset package. The functions `node_labels()`, `node_rules()`, and `top_items()` can be used to identify the splitting variables in the tree, the rules applied at each split, and the top-performing items in each node.

```{r node_info, message=FALSE, eval=TRUE, echo=TRUE}
node_labels(tree)

node_rules(tree)

top_items(tree, top = 3)
```

```{r node_info2, message=FALSE, eval=TRUE,echo=TRUE}
plot(tree, ref = "Amadeus 77")
```

# Reliability of superior varieties 

The function `reliability()` can be used to compute the reliability estimates [@eskridge_1992] of the evaluated common bean varieties in each of the resulting nodes of the Plackett-Luce tree. This helps identify varieties with a higher probability of outperforming a variety check (Amadeus 77). For simplicity, we present only the varieties with a reliability score $\geq$ 0.5.

```{r rel1, message=FALSE, eval=FALSE, echo=TRUE}
reliability(tree, ref = "Amadeus 77")
```

```{r rel2, message=FALSE, eval=TRUE, echo=FALSE}

rel = reliability(tree, ref = "Amadeus 77")

rel = rel[rel$reliability >= 0.5, ]

rel = rel[c(1:5)]

rel

```

The results show that three varieties marginally outperform Amadeus 77 under drier growing conditions (Rtotal $\leq$ 193.82 mm), while two varieties demonstrate superior yield performance under higher rainfall conditions (Rtotal $>$ 193.82 mm) compared to the reference. This approach is valuable for identifying superior varieties tailored to different target population of environments.

For instance, the variety ALS 0532-6 exhibits weak performance in the overall yield ranking but outperforms all others in the subgroup with higher rainfall conditions. Combining rankings with socio-economic covariates could further enhance the identification of superior varieties for specific market segments, as proposed by Voss et al. (2024) [@Voss2024]

# Going beyond yield

A more comprehensive approach to assessing the performance of varieties involves using "overall appreciation," as this trait is expected to capture the performance of a variety not only for yield but also for all other traits prioritized by farmers. To support this hypothesis, we use the `compare()` function, which applies the method proposed by Bland and Altman (1986) [@MartinBland1986] to assess the agreement between two different measures. Here, we compare overall appreciation and yield. If both measures completely agree, all the varieties should be centered at 0 on the Y-axis.

```{r compare, message=FALSE, echo=TRUE, eval=TRUE, out.width="50%"}
Overall = PlackettLuce(R[[baseline]])
Yield = PlackettLuce(R[[yield]])

compare(Overall, Yield) +
  labs(x = "Average log(worth)",
       y = "Difference (Overall appreciation - Yield)")
```

The chart reveals no complete agreement between overall appreciation and yield. For instance, variety SX 14825-7-1 exhibits superior performance for overall appreciation compared to yield. By examining the *log-worth* estimates in the worth map, we can argue that the superior performance of this variety is likely influenced by traits such as taste, marketability, and disease resistance. However, these aspects were not captured when assessing yield alone.

# Conclusion

This vignette demonstrates a detailed workflow for analyzing tricot data in the context of on-farm testing trials. By integrating farmers' evaluations, agro-climatic covariates, and trait-specific performance metrics, the analysis provides valuable insights into the performance and adaptability of bean varieties across diverse environmental and socio-economic contexts.

Key findings reveal that while yield remains a critical trait, other traits such as taste, marketability, and disease resistance significantly influence farmers' overall appreciation of varieties. The use of Kendall correlation highlighted the traits most strongly associated with farmers’ preferences, while the worth maps and Plackett-Luce models provided a clear visualization of variety performance across traits. Furthermore, the analysis of rainfall effects using Plackett-Luce trees underscored the importance of agro-climatic factors in determining the relative performance of varieties, enabling the identification of genotype-by-environment interactions.

The vignette also emphasizes the value of using "overall appreciation" as a comprehensive indicator of variety performance. Comparing this measure with yield alone demonstrated the limitations of focusing exclusively on yield, as traits such as taste and marketability can significantly enhance variety appeal.

Finally, the reliability analysis and tree-based exploration of rainfall effects provide insights for breeding programs and product development. These tools enable researchers and practitioners to identify superior varieties tailored to specific target population of environments and market needs. By combining statistical rigor with participatory approaches, this workflow supports more effective and farmer-centric decision-making in crop improvement.

This vignette illustrates how decentralized data, participatory methods, and advanced statistical models can work together to enhance breeding and selection strategies for common bean and other crops.

# References

