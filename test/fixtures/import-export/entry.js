import foo, { bar } from './dep';

function Foo() {
  var b = foo;
  var baz = 'baz' + Math.random().toString();
  return function () {
    return {
      a: b + bar + baz,
      b: b,
      baz: baz,
    };
  };
}

export default Foo;
