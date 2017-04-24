module Main = {
  include ReactRe.Component;
  let name = "Main";
  type props = unit;
  let render _ => <div />;
};

include ReactRe.CreateComponent Main;

let createElement = wrapProps ();
