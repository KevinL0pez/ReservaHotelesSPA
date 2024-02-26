// import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
// import { FormControl } from '@angular/forms';
// // import { resolveErrorMessage } from '@common/helpers/errors/errors';
// import { Subscription, asyncScheduler } from 'rxjs';

// interface ControlElements {
//   $element: HTMLElement;
//   $parent: HTMLDivElement;
//   $error: HTMLDivElement;
// }

// @Directive({
//   selector: '[appFormErrorHandler]',
// })
// export class FormErrorHandlerDirective implements OnInit, OnDestroy {
//   readonly #renderer = inject(Renderer2);
//   readonly #controlRef = inject<ElementRef<HTMLElement>>(ElementRef);
//   #controlTauched = true;
//   #controlSubscription!: Subscription;

//   @Input('appFormErrorHandler') control!: FormControl;

//   ngOnInit() {
//     const controlElements = this.#getControlElements();
//     this.#controlSubscription = this.control.valueChanges.subscribe(() => {
//       asyncScheduler.schedule(() => {
//         if (this.#hasError()) {
//           this.#createErrorElement(controlElements);
//         } else {
//           this.#removeErrorElement(controlElements);
//         }
//       });
//     });
//   }

//   ngOnDestroy() {
//     this.#controlSubscription.unsubscribe();
//   }

//   #getControlElements(): ControlElements {
//     const $element = this.#controlRef.nativeElement;
//     const $parent: HTMLDivElement = this.#renderer.parentNode($element);
//     const $error: HTMLDivElement = this.#renderer.createElement('div');

//     return { $element, $parent, $error };
//   }

//   #createErrorElement({ $element, $parent, $error }: ControlElements) {
//     if (!$parent.contains($error)) {
//       this.#renderer.appendChild($parent, $error);
//     }
//     const errorMessage = this.#getErrorMessage();
//     if ($error.innerText !== errorMessage) {
//       $error.innerText = errorMessage ?? '';
//     }
//     if (!this.#hasClasses($error, 'invalid-feedback')) {
//       this.#renderer.addClass($error, 'invalid-feedback');
//     }
//     if (!this.#hasClasses($element, 'is-invalid')) {
//       this.#renderer.addClass($element, 'is-invalid');
//     }
//   }

//   #removeErrorElement({ $element, $parent, $error }: ControlElements) {
//     if ($parent.contains($error)) {
//       this.#renderer.removeChild($parent, $error);
//     }
//     if (this.#hasClasses($element)) {
//       this.#renderer.removeClass($element, 'is-invalid');
//     }
//   }

//   #hasClasses($element: HTMLElement, ...classes: string[]) {
//     return classes.every(className => $element.classList.contains(className));
//   }

//   #getErrorMessage() {
//     return this.#hasError() ? resolveErrorMessage(this.control.errors) : null;
//   }

//   #hasError() {
//     const { invalid, dirty, touched } = this.control;

//     return invalid && (dirty || (this.#controlTauched && touched));
//   }
// }
