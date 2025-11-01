varying vec2 v_uv;
uniform sampler2D tex;

void main() {
    // set the color of the pixel
    gl_FragColor = texture2D(tex, v_uv);
}
