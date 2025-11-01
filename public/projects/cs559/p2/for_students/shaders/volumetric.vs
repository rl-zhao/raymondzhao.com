// THIS SHADER WAS TAKEN FROM:
// https://github.com/jeromeetienne/threex.volumetricspotlight
// License: MIT
// Effects based on http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html

// I adapted it to work with our class framework!
// For more attribution details, see external/README.md

// Since these shaders aren't particularly complex, I've also included comments showing
// I understand what they do.

varying vec3 v_normal;
varying vec3 v_position;

void main() {
    // normal is needed to calculate the angle power later in the fragment shader
    v_normal = normalize(normalMatrix * normal);

    // world coordinates
    v_position = (modelMatrix * vec4(position, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
