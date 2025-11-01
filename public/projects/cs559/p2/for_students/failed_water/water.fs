varying vec2 v_uv;

varying vec3 l_normal;
varying vec3 lookDirection;
// varying vec4 worldPosition;

uniform samplerCube cubemap;

// uniform sampler2D reflectionMap;
uniform sampler2D waterNormals;

void main() {
    // vec4 normalMapValue = 2.0 * texture2D(waterNormals, v_uv) - 1.0;
    // vec3 unitNormal = normalize(normalMapValue.rgb);

    // turn scene upside down
    // reflectedDirection.y = -reflectedDirection.y;

    // vec3 lookDirection = cameraPosition - worldPosition.xyz;

    // vec3 reflectedDirection = normalize(reflect(lookDirection, normalize(v_normal)));
    // reflectedDirection.y = -reflectedDirection.y;
    vec3 reflectedDirection = normalize(reflect(lookDirection, normalize(l_normal)));

    // reflectedDirection.y = -reflectedDirection.y;
    // reflectedDirection.x *= 2.5;
    // reflectedDirection.z *= 2.5;

    // reflectedDirection = reflectedDirection * viewMatrix;

    gl_FragColor = vec4(texture(cubemap, normalize(reflectedDirection)).xyz * 0.7, 1.0);
    // gl_FragColor = texture2DProj(reflectionMap, reflectedDirection);
    // gl_FragColor = texture2D(reflectionMap, v_uv);
}
