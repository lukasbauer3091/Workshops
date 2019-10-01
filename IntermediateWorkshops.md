# Intermediate Workshops

Just like the Intro to Neurotech course, this course will rely heavily on labs to make the workshops more interactive and experiential. The course will center around a year-long project, and each week will have milestones leading to the completion of a part of this project. Lectures will be used as a way of conveying theoretical material, and readings will be used to supplement each week's lab. In addition, a paper that relates to the week's topic will be assigned each week for skimming.

## Textbook
We will rely on a few textbooks. Chapters 1-5 from the Deep Learning Book (freely available) (Ian Goodfellow, Yoshua Bengio, Aaron Courville) will supplement material for Weeks 2, 5, and 6. We are currently searching for a free textbook for Weeks 10-16 (hardware). Weeks 17-24 will feature selected chapters from various textbooks and journal articles.

## Course Project: undecided
* Possibly an EMG classifier; something with both cloud machine learning, analog hardware, and IoT

## Milestones (so far)
* Create an app that streams EEG in real-time using MuseJs
* Design a simple ML model for blink detection
* Design an ML model for some ERP (P300, N170, etc)
* Deploy the ML model onto the cloud for real-time analysis
* Design and build an EMG acquisition circuit (or some other biosignals circuit)
* (final project)

## Sections
### Section 1: Machine Learning and ERPs
* NumPy
* Linear algebra concepts
* Intro to stats: mean, median, mode, what is probability, conditional, joint, marginal, Baye's rule
* Sampling, sample sizes, confidence intervals?
* Bias, variance
* MLE, E/M
* Normalization
* Bootstrapping, bagging
* SVM, LDA, random forest, k-means
* Epoching, windowing
### Section 2: Analog Electronics for Physiology
* Analog electronics
* Muscle neurology
### Section 3: Advanced Neuro, Psych, Cog Topics
### Section 4: Advanced Neurotech  + Projects

## Syllabus

Week 1: Intro to React
* Make a simple webpage (HTML, CSS)
* Add React
* Visualize some dummy data from CSV, etc
    * (and then next week we do stuff with the data)
    * Or possibly from MuseJs

Week 2: Dissecting Journal Articles

Week 3: Intro to ML
* Stats, calc, optimization, linAlg
Week 4: OOP / Code Design
* OOP, design patterns
* Give them a problem (ie elevator system) and group of 4 designs the code

Week 5: ERPs (neuro)

Week 6: ML II
* Some models, math / stats behind them, implement by yourself
* Blink detection!

Week 7: ML III
* LDA, SVM
    * math / stats behind them, implement by yourself
* ERP detection (offline data)!!

Week 8: ERP experimentation
* Make your own EEG experiment! 

Week 9: ML IV (last one)
* Classify data from your EEG experiment

Week 10: Back end / cloud
* Create real-time Python / Flask service for ML model from Wk7

Week 11: Intro to electricity (V=IR, etc)

Week 12: KCL / KVL, Thevenin's Theorem

Week 13: RLC circuits
* Calc, differential equations

Week 14: Amplifiers

Week 15: Analog Filters

Week 16: EMG Device

Week 17: IoT

Weeks 18--20: Select topics in neurosci, cogsci, psych
* Neuromodulation
* Single-neuron modelling
* Theory of mind?
* (some other things that are undecided yet)

Week 21, 22: Select topics in (more) advanced neurotech
* Network interactions, short-time Fourier Transform

Week 23, 24: Final project (concatenation of milestones)