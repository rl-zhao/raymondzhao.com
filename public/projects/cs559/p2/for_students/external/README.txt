All files here are taken from external sources (potentially modified for use with the framework).
If a file is here, I DID NOT WRITE IT.

Attribution is given below.

NOTE: Not all files that are taken / adapted from external sources are in this directory. There are a few that have
my own work mixed in, so those are in other directories.

Below should be an exhaustive list of all external sources used in the project (including those not in this directory).
I will also include this list in p2-workbook.txt.

- sky-cubemap: Kloppenheim 06 - HDRI Haven
  - source: https://polyhaven.com/a/kloppenheim_06_puresky
  - author: Greg Zaal, Jarod Guest
  - license: CC0
  - converted to cubemap using https://matheowis.github.io/HDRI-to-CubeMap/

- small-house: Model downloaded from Free3D
  - source: https://free3d.com/3d-model/wooden-house-752597.html
  - author: abhijithcheruvery
  - license: Personal Use License

- AmbientCG - most of the external textures are from here
  - source: https://ambientcg.com
  - author: AmbientCG (by Lennart Demes)
  - license: CC0
  - All external textures used:
    - RoofingTiles001 (used for train stations): https://ambientcg.com/view?id=RoofingTiles001
    - Wood060 (used for rail ties / benches / wooden stuff): https://ambientcg.com/view?id=Wood060
    - ScatteredLeaves001 (used for trees): https://ambientcg.com/view?id=ScatteredLeaves001
    - PavingStones128 (used for train stations): https://ambientcg.com/view?id=PavingStones128
    - Grass001 (used for grass on world plane): https://ambientcg.com/view?id=Grass001
    - Concrete034 (used for pagoda): https://ambientcg.com/view?id=Concrete034

- Water
  - source:
    - Material and code taken from THREE.js examples - Water https://threejs.org/examples/?q=water#webgl_water
      - I had to modify it to work with the CS559 framework
      - Link to source code: https://github.com/mrdoob/three.js/blob/master/examples/jsm/objects/Water2.js
      - (and Reflector.js and Refractor.js in the same place)
    - Water normal pictures (Water_1_M_Normal.jpg, Water_2_M_Normal.jpg) are taken from the example as well
      - Link: https://github.com/mrdoob/three.js/tree/master/examples/textures/water
  - author: Slayvin, mrdoob, and others
  - license: MIT

- Failed Water (not used in finished project)
  - source:
    - waternormals.jpg - taken from the other THREE.js water example https://threejs.org/examples/?q=water#webgl_shaders_ocean
      - Link: https://github.com/mrdoob/three.js/blob/master/examples/textures/waternormals.jpg
  - author: jbouny, mrdoob, and others
  - license: MIT

- Train Icon (used on Green Line train sign for the train stations)
  - source: https://commons.wikimedia.org/wiki/File:264_Metroo.svg
  - author: Caro Asercion
  - license: CC 3.0

- Volumetric Lights
  - source: https://github.com/jeromeetienne/threex.volumetricspotlight
    - I created an object using this shader and modified it to work with the CS559 framework.
  - author: jeromeetienne
  - license: MIT

- Thinking Emoji (used on the flag)
  - source: Twemoji - Wikimedia Commons image source link: https://commons.wikimedia.org/wiki/File:Twemoji2_1f914.svg
  - author: Twitter
  - license: CC 4.0
