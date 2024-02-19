---
layout: "../../layouts/BlogPost.astro"
title: "Rendering LaTeX using MathJax in Markdown"
description: "Ever wanted to render math expressions easily in a blog? No? Well, whatever."
date: "Aug 23 2022"
---

<script>
MathJax = {
	options: {
		skipHtmlTags: { '[-]': ['code'] },
	},
	tex: {
		inlineMath: { '[+]': [['$', '$']] },
	},
	startup: {
		pageReady: function() {
			let codes = document.getElementsByTagName('code');
			let mathCodes = [];

			for (let i = 0; i < codes.length; i++) {
				let code = codes[i];

				if (code.parentNode.tagName !== 'PRE' && code.childElementCount === 0) {
					let text = code.textContent.trim();

					let inputs = MathJax.startup.getInputJax();

					for (let j = 0; j < inputs.length; j++) {
						if (inputs[j].processStrings) {
							let matches = inputs[j].findMath([text]);
							if (matches.length === 1 && matches[0].start.n === 0 && matches[0].end.n === text.length) {
								code.classList.add("inline-latex");
								mathCodes.push(code);
								break;
							}
						}
					}
				}
			}

			MathJax.typesetPromise([mathCodes]);
		}
	},
};
</script>
<script id="MathJax-script" async="" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>

# Rendering LaTeX using MathJax in Markdown

This is perhaps one of the more interesting problems I've encountered while doing my first foray into the world of converting Markdown to a webpage.

The problem: I wanted to be able to render LaTeX in Markdown, for the resource pages on [the Neuqua Valley Computing Team website](https://nvcomputing.com). This is because ACSL, one of the competitions we participate in, covers many advanced computer science topics and uses very many math symbols, meaning it would make our lives a lot easier while writing resources if we could just put a math expression inside Markdown, like this example from the Boolean Algebra page:

```md
## Simplify the Expression

### Problem 1: `$$\overline{\overline{A}(B + C)} • B + \overline{B}$$`
```

which would then render to:

## Simplify the Expression

### Problem 1: `$$\overline{\overline{A}(B + C)} • B + \overline{B}$$`

After some cursory Googling, I stumbled across [this blog post from Yihui Xie](https://yihui.org/en/2018/07/latex-math-markdown/). It seemed to be exactly what I needed, but after further examination, I found this was not the case.

It was a somewhat clunky script, with a bunch of regular expressions that decided what was and wasn't a math expression. I wanted a clear-cut delimiter I could use for every math expression (preferably using dollar signs, as is traditional with TeX.)

Turns out, in the comments section of his blog post, someone else had also had this exact same problem, and posted a link to their blog post about it, which is how I then found [Matthijs Kooijman's blog post about this topic](https://www.stderr.nl/Blog/Blog/MathJaxInMarkdown.html). It goes in-depth about exactly how he improved Yihui Xie's solution, and his code was exactly what I was looking for. It would render anything using

```md
`$single dollar signs$`
```

as an **inline** math expression like `$1+2=3$`, and anything using

```md
`$$double dollar signs$$`
```

as an **indented, centered, full-width** math expression like `$$1+2=3$$` that displays on its own line.

Thanks to the fact that this solution altered the MathJax configuration directly, it only typesetted exactly what I wanted it to typeset, meaning the script worked great for my purposes of putting LaTeX math in a webpage.

However, there was still one more problem: The script was running really, really, really slow. As in, pages with more than a few math expressions took upwards of a couple seconds to fully render.

After some investigation, the culprit was `MathJax.typeset()`. Because of the way Matthijs' script was set up, for every LaTeX element it found, it attempted to typeset THAT element only. Turns out, because `MathJax.typeset()` is supposed to be called with an ARRAY of elements to typeset, for every single call, it was completely re-rendering the *entire* document, synchronously... which was fine with one math expression, but rapidly became not-so-fine as more math expressions were added.

After a while reading MathJax documentation, I found out that `MathJax.typeset()` had an equivalent, `MathJax.typesetPromise()` that used promises to do the typesetting, all at once, asynchronously. Using this, I modified the script to push all the potential inline LaTex to an array, and then typeset it asynchronously, all at once. This ran much, much faster, and is the final version of the script that is currently in use, both here (for demonstration purposes) and on the NVComputing website.

Hopefully I'm done with rendering math in websites, though. I would really rather not render differential equations.
