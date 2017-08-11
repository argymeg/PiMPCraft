# PiMPCraft

PiMPCraft is a [Minecraft](https://www.minecraft.net/) plugin designed for visualisation of metabolomic data. It can plot metabolic network maps, as well as 3D graphs of individual metabolic pathways, from data provided by [MetExplore](http://metexplore.toulouse.inra.fr/). It can also display the effects of experimental conditions on the metabolome, using data obtained from [PiMP](http://polyomics.mvls.gla.ac.uk/).

## Contents
1. [The client side](#the-client-side)
2. [The server side](#the-server-side)
3. [Known bugs](#known-bugs)
4. [License](#license)


<a name ="the-client-side"></a>

## The client side

### Requirements:
* A computer meeting the Minecraft [system requirements](https://help.mojang.com/customer/en/portal/articles/325948-minecraft-system-requirements)
* [Minecraft](https://minecraft.net/) version 1.11.2 (see [here](https://help.mojang.com/customer/portal/articles/1475923-changing-game-versions) for help)
* Any modern web browser

### User interface

The PiMPCraft landing page, which can be accessed using a web browser on port 32909 if the server is running on the local computer, provides an interface for uploading user data, as well as handy access to the PiMPCraft documentation.

To access the PiMPCraft world from Minecraft, after logging in, select *Multiplayer*, then *Add server*, select a name for the server and enter its address (which will be simply *localhost* if running on your local computer). Then select the server you just added and click *Join server*.

On joining the PiMPCraft server, you will be shown a welcome message informing you of the MetExplore BioSource you are currently viewing, as well as any files uploaded under your name. You will then given access to a map of the metabolic network, including switches to view the subset of the network corresponding to a particular cellular compartment. Selecting a node on this network, representing a specific pathway, will transport you to a view of this pathway. If you have previously uploaded a file of your own metabolomic data, this view will highlight the metabolites identified as changing.

By default, PiMPCraft displays data from MetExplore's BioSource 4324, based on the [Recon 2](http://humanmetabolism.org/) reconstruction of human metabolism.

Depending on your computer and network speed, building structures can take a few seconds, especially on the first time they are accessed.

A command line interface is provided via the Minecraft console (accessible by pressing / on the keyboard), which provides direct access to the above, as well as exposing some additional functionality.

Available commands are:

* `/jsp reset`

Reinitialises the user's view of the PiMPCraft world from scratch.

* `/jsp buildMap <compartment name (optional)>`

Redraws the network map. If no compartment name is specified, it draws the entire network.

* `/jsp toggleMapMode`

Toggles the map view between a force-directed layout (default) and an alphabetical grid.

* `/jsp buildPath <pathway name>`

Draws a view of the specified pathway

* `/jsp chooseFile <filename>`

Allows choosing between different user-uploaded files for displaying changes in pathways. Leaving the filename blank will revert to a vanilla view of the network.

* `/jsp teleportMe <playername>`

Teleports player to the location of another player

* `/jsp changeBioSource <id>`

Allows changing the BioSource to explore the metabolome of different organisms. This option is currently **experimental**. Applying user-provided data, in particular, is **not** expected to work properly beyond the default BioSource.

Building and breaking blocks is disabled by default. Server administrators can give full op privileges to particular players wishing to get creative, using the command `op <playername>` on the server console, or customise the WorldGuard configuration for more advanced setups. Note that ops get full access to the ScriptCraft API, allowing the execution of arbitrary JavaScript code - be selective.

#### Colour coding of pathway graphs

| Entity type                | Colour |
|----------------------------|--------|
| Unchanging metabolite      | Black  |
| Upregulated metabolite     | Blue   |
| Downregulated metabolite   | Red    |
| Side compound              | White  |
| Edge - substrate to enzyme | Pink   |
| Edge - enzyme to product   | Green  |

<a name ="the-server-side"></a>

## The server side

This section will be of interest to users intending to run their own instance of the PiMPCraft server.

### Requirements:

* A recent computer with at least 2 GB of RAM
* A *nix OS (tested on macOS and Linux) <sup>1</sup>
* Outbound HTTP access on port 8080 <sup>2</sup>
* GNU Screen
* curl
* [Git](https://www.git-scm.com/)
* [Java](https://www.java.com/) (SE 8)
* [R](https://www.r-project.org/)


There are no concrete CPU or storage space requirements, although a fast CPU can have a significant effect on performance. The base installation takes up around 50 MB of disk space, however the Minecraft world files can increase in size rapidly with usage - do plan accordingly.

Four shell scripts are provided with the server:
* An installer script (*install.sh*)
* A launcher and stopper for the full PiMPCraft stack (*start.sh* and *stop.sh*, respectively)
* A maintenance script to clear the Minecraft world (*clearworld.sh*). It is recommended to run this script regularly.

Certain R packages need to be installed before using the PiMPCraft server. The installer script will attempt to detect and install them, however depending on the R configuration they might have to be installed  manually - all are available on CRAN and can be installed using `install.packages()`. Those are:

* [igraph](http://igraph.org/r/)
* [jsonlite](https://github.com/jeroen/jsonlite/)
* [plumber](https://www.rplumber.io/)
* [shiny](https://shiny.rstudio.com/)
* [markdown](https://github.com/rstudio/markdown)
* [curl](https://github.com/jeroen/curl/)

Apart from needing to agree to the Minecraft EULA before beginning the installation, all scripts are non-interactive and self-documenting.

It is recommended to regularly clean the server cache, conveniently located under the *cache* directory. At a minimum, if the server is externally accessible, user-uploaded data (identified by the "userData" prefix) should be regularly scrubbed.

The PiMPCraft stack is comprised of three distinct components: the [Spigot](https://www.spigotmc.org/) Minecraft server, with the [ScriptCraft](https://scriptcraftjs.org/), [WorldEdit](https://dev.bukkit.org/projects/worldedit) and [WorldGuard](https://dev.bukkit.org/projects/worldguard) plugins installed, a [plumber](https://www.rplumber.io/) server and a [Shiny](https://shiny.rstudio.com/) server. Access to the Spigot console, as well as the logging output of the other two components, is provided via separate GNU Screen sessions.

[1]: Individual components are cross-platform and have been tested on Windows, however no installation or launch infrastructure is currently provided for that platform.

[2]: Eduroam is known to block this port in some locations.

<a name ="known-bugs"></a>

### Known bugs
* Pathway selection from the network map may occasionally malfunction and produce an error message. Redrawing the map should fix the issue.

<a name ="license"></a>

### License

The PiMPCraft source code will soon be made available under the GNU GPL.

Incorporates code from bresenham-js, available under the MIT license.
