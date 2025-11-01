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

uniform vec3 lightColor;
uniform vec3 spotlightPosition;
uniform float attenuation;
uniform float anglePower;

void main() {
    float intensity;

    // distance attenuation - divide distance by attenuation factor
    // v_position is the position of the pixel in world space
    intensity = distance(spotlightPosition, v_position) / attenuation;
    intensity = clamp(intensity, 0.0, 1.0);

    // recalculate normal (flip z if negative)
    vec3 normal = vec3(v_normal.xy, abs(v_normal.z));

    // calculate the angle between the viewing angle and the normal vector
    // the higher the anglePower, the more the light intensity will fall off when you're
    // not looking directly at it
    float angleIntensity = pow(dot(normal, vec3(0, 0, 1)), anglePower);

    // set the color of the pixel
    gl_FragColor = vec4(lightColor, intensity * angleIntensity);
}
