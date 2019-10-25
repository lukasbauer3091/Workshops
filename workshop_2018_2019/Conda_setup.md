This guide is for getting **Miniconda** (light weight version of Anaconda) up and running on your local computer and ready for starting a new project. If you have trouble at any point, most if not all the information can be found here: https://conda.io/projects/conda/en/latest/user-guide/getting-started.html

# Installation
Follow the instructions here to download and install Miniconda with Python 3: https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/install/index.html. You will be using this throughout the workshops. 

## Installing conda on a system with other Python installations
**YOU DO NOT NEED TO UNINSTALL ANY VERSION OF PYTHON YOU CURRENTLY HAVE INSTALLED.**
https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/install/index.html#installing-conda-on-a-system-that-has-other-python-installations-or-packages

## Confirm installation
To verify that you installed correctly, try to run the Anaconda Navigator (see https://docs.anaconda.com/anaconda/install/verify-install/) Alternatively:
If you have a Mac: try running "conda --version" in a Terminal window. You should be able to see the version of conda you have installed.
If you have Windows: open up Anaconda Prompt
If you get an error message, see: https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-conda.html

# Environments
In every project that you make, you will want to create a separate **'virtual environment'** which will contain only the packages you need for the project. For the workshops, make an environment called *nt-env*.
See here for how to setup and manage an environment with conda (make sure you initialize with Python 3): https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#managing-environments


# Managing packages
The main commands related to packages in conda are "search", "list", and "install". More information can be found here: https://conda.io/projects/conda/en/latest/user-guide/getting-started.html#managing-packages

You will need to install the following packages:
- numpy
- matplotlib
- biosppy (**Please note**: you will have to use "pip install biosppy" as it is not available through "conda install")
- jupyter (only if not already installed - see below to check list of installed packages)
# How to install packages:
1) Open "Anaconda Navigator/Terminal"
2) Go into your project environment (see above). Ex: "conda activate nt". Now should see (nt) on the left side.
3) Example command: "conda install numpy". Type [y] and press enter to proceed through prompts.

# How to update packages:
1) Enter your environment (see installing packages)
2) "conda update [package name]"

# Show all packages installed in environment
1) Enter your environment (see installing packages)
2) "conda list"

# How to open a jupyter notebook
1) Enter your environment
2) type in "jupyter notebook"
3) If a window does not automatically open, copy the url displayed by your terminal window into a web browser.
4) if the terminal gives an error, it means you don't have jupyter installed. see above on how to install jupyter.
5) In the jupyter window, navigate to the neurotech workshops repository which you downloaded or cloned with git (should be a folder called "Workshops")
6) Notebooks have the file extension .ipynb. double click to open. This is where you will be writing and running all of the python code in these workshops.
