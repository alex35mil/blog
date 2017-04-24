module H1 = {
  include ReactRe.Component;
  let name = "H1";
  type props = {children: list ReactRe.reactElement};
  let render {props} => <h1 className="h1"> (ReactRe.listToElement props.children) </h1>;
};

include ReactRe.CreateComponent H1;

let createElement ::children => wrapProps {children: children} ::children;
