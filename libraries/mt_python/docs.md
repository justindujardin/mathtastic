# mathtastic.expressions

## MathExpression
```python
MathExpression(self, id=None, left=None, right=None, parent=None)
```
A Basic MathExpression node
## UnaryExpression
```python
UnaryExpression(self, child, operatorOnLeft=True)
```
An expression that operates on one sub-expression
## NegateExpression
```python
NegateExpression(self, child, operatorOnLeft=True)
```
Negate an expression, e.g. `4` becomes `-4`
## FunctionExpression
```python
FunctionExpression(self, child, operatorOnLeft=True)
```

A Specialized UnaryExpression that is used for functions.  The function name in
text (used by the parser and tokenizer) is derived from the name() method on
the class.

## BinaryExpression
```python
BinaryExpression(self, left=None, right=None)
```
An expression that operates on two sub-expressions
## EqualExpression
```python
EqualExpression(self, left=None, right=None)
```
Evaluate equality of two expressions
## AddExpression
```python
AddExpression(self, left=None, right=None)
```
Add one and two
## SubtractExpression
```python
SubtractExpression(self, left=None, right=None)
```
Subtract one from two
## MultiplyExpression
```python
MultiplyExpression(self, left=None, right=None)
```
Multiply one and two
## DivideExpression
```python
DivideExpression(self, left=None, right=None)
```
Divide one by two
## PowerExpression
```python
PowerExpression(self, left=None, right=None)
```
Raise one to the power of two
## AbsExpression
```python
AbsExpression(self, child, operatorOnLeft=True)
```
Evaluates the absolute value of an expression.
## SgnExpression
```python
SgnExpression(self, child, operatorOnLeft=True)
```

