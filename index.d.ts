interface AwWys extends HTMLElement {
	inputElement: HTMLInputElement,
    changefunc: Function,
    focusinfunc: Function,
    focusoutfunc: Function
}

declare var AwWys: {
	prototype: AwWys,
	new(): AwWys
}