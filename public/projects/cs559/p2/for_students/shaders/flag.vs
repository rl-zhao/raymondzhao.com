varying vec2 v_uv;
uniform float time;

void main() {
    // displace by normal vector depending on uv
    float x = uv.x * 6.0;
    float y = uv.y * 4.0;

    // move y down a bit depending on x
    vec3 adjPosition = vec3(position.x, position.y - (position.x / ((8.0 + 2.0 * sin(0.5 * time)) / ((y + 4.0) / 3.0))), position.z);

    float displacement = sin(x + time) * 0.1 + cos(y + time) * 0.1;

    // don't displace next to the flagpole
    displacement = displacement * (x / 5.0);

    vec3 newPosition = adjPosition + normal * displacement;

    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
