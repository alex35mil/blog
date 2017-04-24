module P = {
  include ReactRe.Component;
  let name = "P";
  type props = {children: list ReactRe.reactElement};
  let render {props} => <p className="paragraph"> (ReactRe.listToElement props.children) </p>;
};

include ReactRe.CreateComponent P;

let createElement ::children => wrapProps {children: children} ::children;
