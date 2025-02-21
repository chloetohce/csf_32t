# CSF_32T

## Notes
### Validation
You should only prompt error only if the user touches the field. 

You should use the `pristine` or the `dirty` attributes

```typescript
protected hasError(ctrlName: string): boolean {
    const ctrl = this.form.get(ctrlName) as FormControl
    return !ctrl.pristine && ctrl.invalid
}
```

## Questions
- How to have multiple checkboxes that returns an array in Angular?
- How does @for work? What does `track` mean and do?