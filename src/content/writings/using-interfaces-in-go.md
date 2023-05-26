---
title: "Using interfaces in Go the right way"
description: "Go interfaces offer great flexibility and powerful abstraction. However, their misuse can lead to cluttered and unmaintable code. Read this guide to learn how to use Go interfaces that follow SOLID design principles"
pubDate: "Feb 10, 2022"
toc:
  [
    {
      parent: "Accept Interfaces, Return Structs",
      children: ["Don't Do This", "Do This Instead"],
    },
    { parent: "Go Standard Library" },
    { parent: "Interface Segregation Principle" },
    { parent: "References" },
    { parent: "Further Reading" },
  ]
---

An interface is a programming construct that describes the behavior of an object without specifying the underlying implementation details. Interfaces in Go are really powerful because they are satisfied implicitly, i.e. a type implements an interface simply by having the methods declared in the interface. However, many Go programmers misuse interfaces that results in a code smell known as [interface pollution](https://rakyll.org/interface-pollution/). This article will present the correct way of using interfaces that will help people write maintainable Go code that follows SOLID principles.

## Accept Interfaces, Return Structs

Interfaces provide abstraction to the actual implementations. Therefore, to define an interface before they are used by a consumer is analogous to putting the cart before the horse. You’re doing it in the wrong order. It is difficult to abstract out the common behavior when you don’t have a realistic example of usage. Rather than thinking of an interface first and then an implementation, use interfaces to be generous in what you accept. The implication of this idea is that interfaces should be defined close to where they are used. This notion is supported in the [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments#interfaces) which states:

> “Go interfaces generally belong in the package that uses values of the interface type, not the package that implements those values.”

The Code Review document details further that the implementer package should return concrete types so new methods can be added to the implementations without requiring refactoring at the consumer side. This is actually a reiteration of a software design guideline known as the [robustness principle](https://en.wikipedia.org/wiki/Robustness_principle). It roughly states that be conservative in what you send but be liberal in what you accept. And when you translate this principle in the context of Go, it turns out to be a popular saying in the Go community:

> “Accept interfaces, return structs”

### Don't Do This

```go
package tcp
type Server interface {
    Start()
}
type server struct { ... }
func (s *server) Start() { ... }
func NewServer() Server { return &server{ ... } }
```

```go
package consumer
import “tcp”
func StartServer(s tcp.Server) { s.Start() }
```

Here the interface is defined in the implementer package i.e. `tcp`. As mentioned in Go Code Review Comments referenced earlier, this is not the best practice because the interface is defined just so one type can satisfy it. It is not defined for the purpose of abstraction. Also, it unnecessarily couples the consumer package to the implementer package.

### Do This Instead

```go
package tcp
type Server struct { ... }
func (s *server) Start() { ... }
func NewServer() Server { return &Server{ ... } }
```

```go
package consumer
type Server interface {
    Start()
}
func StartServer(s Server) { s.Start() }
```

Here we define the interface in the consumer package to fulfil usage requirements. This removes the unnecessary dependency on the implementer package. And it minimizes the presumptions about the way an implementation will be consumed.

It also addresses the testability concern because producer packages don’t have to provide interfaces for the user to write their own stubs. During testing, the consumer can simply create a mock implementation of the interface defined in its own scope.

## Go Standard Library

We clearly see that Go standard library abides by the principle of defining interfaces in the packages that actually uses them. One such example is from `io` package which defines the `io.Reader` interface that is consumed by the function `io.Copy`:

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
func Copy(dst Writer, src Reader) (written int64, err error)
```

Now there are actually 39 packages that consume the `io.Reader` but that is because it is such a great example of abstraction.

Another example is from `http` package where the `http.Handler` interface is used by the function `http.ListenAndServe`:

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
func ListenAndServe(addr string, handler Handler) error
```

## Interface Segregation Principle

Not following the above guidelines also results in code that neglects an important piece of Robert C. Martin’s widely acclaimed [SOLID](https://en.wikipedia.org/wiki/SOLID) principles. It is the Interface Segregation Principle, which reads:

> “Clients should not be forced to depend on interfaces that they do not use.”

What this signifies is that a consumer should accept only those types whose methods are strictly required by the consumer. As an example, suppose we want to write a Document structure to a file. The function signature to accomplish this can be any one of these:

```go
// os.File contains many unrelated methods
func Save(f *os.File, doc *Document) error
// io.ReadWriteCloser contains unrelated Read() and Close() methods
func Save(rwc io.ReadWriteCloser, doc *Document) error
// io.Writer contains only one method Write() that is required
func Save(w io.Writer, doc *Document) error
```

In the code example above, the first two signatures contain unrelated methods so they violate the Interface Segregation Principle. Only the last signature satisfies the principle because it contains only one method that is of direct relevance to the consumer.

When we define interface before they are used i.e. in the producer package, they often turn out to be large interfaces that contain many methods. Further, these interfaces will add new methods because implementation changes with time. This means that all the consumers which are using the same interface are more likely to have methods that are unrelated to their functionality.

Therefore, defining interfaces only when the need arises to use them means that we’re following the Interface Segregation Principle. And by following this principle, we prevent bloated interfaces that define methods for multiple responsibilities, resulting in more maintainable Go code.

## References

https://rakyll.org/interface-pollution/

https://github.com/golang/go/wiki/CodeReviewComments#interfaces

https://en.wikipedia.org/wiki/Robustness_principle

https://en.wikipedia.org/wiki/SOLID

## Further Reading

https://dave.cheney.net/2016/08/20/solid-go-design

https://commandercoriander.net/blog/2018/03/30/go-interfaces/

https://www.ardanlabs.com/blog/2016/10/avoid-interface-pollution.html
