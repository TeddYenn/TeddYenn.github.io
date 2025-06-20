---
title: Displaying a Progress Bar in R/Shiny
categories:
- R coding
- Shiny app
excerpt: |
  Best Practices for Visualizing Progress
feature_text: |
  ## Progress Bar in R/Shiny
  Best Practices for Visualizing Progress
feature_image: "/assets/Research_BG.JPG"
image: "/assets/Research_BG.JPG"
aside: true
---

## Progress Bar in R

When running time-consuming loops in R, you can show progress to the user using the built-in functions `txtProgressBar()` and `setTxtProgressBar()`. Here’s how:


```r
total <- 100
pb <- txtProgressBar(min = 0, max = total, style = 3)  # initialize
for (i in 1:total) {
  setTxtProgressBar(pb, i)  # Update progress
  Sys.sleep(0.1)  # Simulate a time-consuming task
}
close(pb)  # Close
```

---

## Progress Bar in Shiny

You can create a dynamic progress bar in R Shiny by rendering a custom UI component that updates as your process runs. Here is a minimal example.


Place this UI output in your `ui` definition where you want the progress bar to appear:

```r
ui <- fluidPage(
  uiOutput("progressUI"),
  # ... other UI components ...
)
```

In your server function, use `renderUI()` to dynamically update the progress bar:

```r
output$progressUI <- renderUI({
  progress <- progressVal()   # progressVal() should return a value between 0 and 1
  if (progress > 0 && progress < 1) {
    progressPercent <- progress * 100
    tags$div(class = "progress",
             tags$div(class = "progress-bar progress-bar-striped progress-bar-animated",
                      role = "progressbar",
                      style = sprintf("width: %s%%;", progressPercent),
                      sprintf("%.0f%%", progressPercent)))
  }
})
```

Use a reactive or observer in your server to update `progressVal()`.

```r
progressVal <- reactiveVal(0)
observe({
  for (i in 1:100) {
    Sys.sleep(0.05)
    progressVal(i / 100)
  }
})
```

---



