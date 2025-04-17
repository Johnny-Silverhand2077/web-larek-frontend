import { IProduct } from '../../types';
import { Render } from './Render';
import { ensureElement } from '../../utils/utils';

export class Card extends Render {
	element: HTMLElement;
	category: HTMLElement;
	image: HTMLImageElement;

	constructor(template: HTMLTemplateElement, openModal: () => void) {
		super();

		this.element = template.content
			.querySelector('.card')!
			.cloneNode(true) as HTMLElement;
		this.category = ensureElement<HTMLElement>('.card__category', this.element);
		this.image = ensureElement<HTMLImageElement>('.card__image', this.element);
		this.initElements(this.element);

		const CardButton = this.element.querySelector('.card__button');
		if (CardButton) {
			CardButton.addEventListener('click', openModal);
		} else {
			this.element.addEventListener('click', openModal);
		}
	}

	render(item: IProduct): HTMLElement {
		this.category.textContent = item.category;
		this.image.src = item.image;
		this.image.alt = item.title;
		this.renderTitle(item.title);
		this.renderPrice(item.price);
		return this.element;
	}
}
