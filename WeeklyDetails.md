
# Weekly Details

### Week 1 (September 22): Intro to Python

Crash course to Python. Covers lists, loops, variables, basic syntax.

Preparation
- No preparation

Materials
- Complete Python crash course: https://www.emaze.com/@AORLQZLLZ/programming-crash-course

### Week 2 (September 29): Intro to Neuroscience

History, how neurons work (brief intro), neuroanatomy review, neurotechnology fundamentals.

Preparation:
- [Wait But Why: Neuralink - The Human Colossus](https://waitbutwhy.com/2017/04/neuralink.html#part1)
- [Wait But Why: Neuralink - The Brain](https://waitbutwhy.com/2017/04/neuralink.html#part2)
- Practice Python (30 mins per day): https://www.practicepython.org/ 

Materials:
- A scientific history of neuroscience discoveries: https://prezi.com/view/RdfcOLXBP5OGB31zeFbt
- Neuroanatomy: https://prezi.com/view/x5Wa2d2EKLPrAFFkhRNt

### Week 3 (October 5): Loading and Graphing Data, Noise Filtering
How to load data from CSVs (or FIFs), graphing data with MatPlotLib, filtering noise in Python, and an introduction to the Fast Fourier Transform

**Note from email**: We have been introduced to Python and the fundamentals of neuroscience – now we are finally ready to start merging the two! In this week’s workshop we are practicing loading, filtering, and graphing of sample EEG data in Python. To learn-by-doing we will be using Jupyter Notebooks (a program we can use to run chunks of code at a time), and Miniconda (it lets you organize different python installations suited for different projects). 

Preparation:
- Learn how to use Git: `./worshop_2018_2019/git_workshop.md`
    - For a deeper understanding of Git:
    - A teeny more in-depth: https://www.emaze.com/@AOOQLWZRZ/git-tutorial
    
- Set up Conda: `./workshop_2018_2019/Conda_setup.md`
    - Ensure you have the specified packages installed
    - You will have to use "pip install biosppy" instead of "conda install biosppy"!
- Virtual environments in Python:
https://towardsdatascience.com/getting-started-with-python-environments-using-conda-32e9f2779307

Materials:

- Start graphing our first signals! (just the Week 2 notebooks) `./workshop_2018_2019/notebooks/exercises/`
    - Use the command in your terminal "git clone https://github.com/lukasbauer3091/Workshops.git" to copy/download the repository to your computer
    - Navigate to the folder above (notebooks/exercises) in your terminal (for help with terminal navigation - use Google!)
    - Use the command "jupyter notebook" to open Jupyter notebook
    - In the window that pops up, complete wk2a and wk2b (there are answers provided in /notebooks/answers if you are stuck)

### Week 4: (October 12): Thanksgiving Break

### Week 7: (October 19) Convolution, Fourier Transform
Overview of convolution, Fourier Transform.

**Note from email**: We have seen how we can use EEG headsets to collect readings of voltage from the brain, and how to visualize the data with Python. The next step on the BCI pipeline is to figure out how to take this huge quantity of data and extract useful indicators and information from it. As we discussed in the "intro to neuroscience" lectures, these readings have a ton of noise (one of the main downsides of EEG vs a more invasive electrode implanted in brain). We filter and clean this data through signal processing. 

Preparation:
- Finish the previous week!

Materials: (video lectures)
- [Intro to signal processing for neurotechnology](https://www.youtube.com/watch?v=QBGjPtU_C6s)
- [More on Fourier Transforms](https://www.youtube.com/watch?v=spUNpyF58BY)

### Week 6: (October 26): Reading Week Break

### Week 5: (November 2) Intro to Angular, MuseJs
Front-end programming with Angular, signal acquisition from the Muse using MuseJs, BrainArt architecture

Milestone 1: Make an app printing out raw data from the Muse in real-time

Preparation: 
- Get started with Angular: `./workshop_2018_2019/angular_readings.md`

Materials:
- Muse Intro Exercise `./workshop_2018_2019/muse-intro.md`


### Week 8: (November 9) Digital Signal Processing I
Convolution, impulse responses, signal types, continuous vs discrete, aliasing, Nyquist's Theorem, FIR vs IIR, different types of filters, filter
order

Prepraration:
- [Introduction to Filters: FIR versus IIR](https://community.plm.automation.siemens.com/t5/Testing-Knowledge-Base/Introduction-to-Filters-FIR-versus-IIR/ta-p/520959)

Materials: `./notes/Workshop6.pdf`

### Rest of material currently being figured out!

<!---
your comment goes here
and here


### Week 7: (August 4) Digital Signal Processing II, Filtering Noise in Angular
Scenario-based practice of DSP I concepts, Filtering noise in Angular

Milestone 2: Filter data from the Muse in your app in real-time

Preparation:
- Review Week 6 material

Materials: TBD

### Week 8: (August 11) Uncovering Oscillatory Processes in EEG
What exactly is EEG, physics of EEG, oscillatory processes vs ERPs, power spectral analysis for EEG power bands

Preparation:
- Review Week 2, Week 6
- [Wait But Why: Neuralink - Brain-Machine Interfaces](https://waitbutwhy.com/2017/04/neuralink.html#part3)

Materials: `/notes/Workshop8.pdf`
 
### Week 9: (August 18) Advanced Git, BrainArt working session
How to use GitHub to code as a team, dev session for BrainArt (offline data)

Milestone 3: Design, implement, and verify EEG interpretation algorithm on pre-collected data in Python

Preparation:
- Practicing Git branches: https://learngitbranching.js.org/

Materials: TBD

### Week 10: (August 25) BrainArt working session
Dev session for BrainArt (online with Muse)

Milestone 4: Implement and verify real-time EEG interpretation algorithm in Angular

Preparation: TBD

Materials: TBD

### Week 11: (mid-September) Present brain art!
Present brain art piece to NeurotechUofT faculty advisors, prizes, and fun!!


--->