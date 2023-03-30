.PHONY: all
all:
	pdflatex paper.tex
	pdflatex paper.tex
	bibtex paper.aux
	pdflatex paper.tex
	pdflatex paper.tex

.PHONY: s
s:
	bibtex paper.aux
	pdflatex paper.tex

.PHONY: p
p:
	pdflatex paper.tex

.PHONY: clean
clean:
	rm -f *.aux *.bbl *.blg *.log paper.pdf

