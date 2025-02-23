import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  private fb = inject(FormBuilder)

  protected orderForm!: FormGroup
  protected availability!: FormArray
  protected availabilityOptions = [
    {id:0, value:"0900 - 1200"},
    {id:1, value:"1200 - 1600"},
    {id:2, value:"1600 - 2000"}
  ]
  protected items!: FormArray

  ngOnInit(): void {
    this.orderForm = this.createOrderForm()
  }

  protected isFieldValid(field: string): boolean {
    return !!this.orderForm.get(field)?.valid || !!this.orderForm.get(field)?.pristine
  }

  protected addItem() {
    this.items.push(this.createItem())
  }

  protected createItem(): FormGroup {
    return this.fb.group({
      item: this.fb.control<string>(''),
      qty: this.fb.control<number>(0),
      unitPrice: this.fb.control<number>(1.0)
    })
  }

  protected removeItem(idx: number) {
    this.items.removeAt(idx)
  }

  protected processOrderForm() {
    console.info(this.orderForm.value)
  }

  protected handleAvailabilityOption(value: string, event: any) {
    if (event.target.checked) {
      this.availability.push(this.fb.group({value: this.fb.control<string>(value)}))
    } else {
      const index = this.availability.controls.findIndex(time => time.value == value)
      this.availability.removeAt(index)
    }
  }

  private createOrderForm() {
    this.items = this.fb.array([])
    this.availability = this.fb.array([])

    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      deliveryDate: this.fb.control<string>('', Validators.required),
      availability: this.availability,
      urgent: this.fb.control<boolean>(false),
      items: this.items,
    })
  }
}
