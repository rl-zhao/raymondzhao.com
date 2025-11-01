varying vec3 l_normal;
varying vec3 lookDirection;

// varying vec4 worldPosition;

varying vec2 v_uv;
uniform sampler2D waterNormals;

void main() {
    v_uv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // assume modelMatrix is its own transpose
    // l_normal = (modelMatrix * vec4(normal,0)).xyz;

    // assume l_normal is just (0, 1, 0)
    l_normal = vec3(0, 1, 0);

    // l_normal = normalize(texture2D(waterNormals, uv).xyz);

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    lookDirection = worldPosition.xyz - cameraPosition;
}
