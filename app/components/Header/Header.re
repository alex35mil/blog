module Header = {
  include ReactRe.Component;
  let name = "Header";
  type props = {children: list ReactRe.reactElement};
  let render {props} =>
    <header className="header"> (ReactRe.listToElement props.children) </header>;
};

include ReactRe.CreateComponent Header;

let createElement ::children => wrapProps {children: children} ::children;
