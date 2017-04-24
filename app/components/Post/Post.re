module Post = {
  include ReactRe.Component;
  let name = "Post";
  type props = {children: list ReactRe.reactElement};
  let render {props} =>
    <section className="post"> (ReactRe.listToElement props.children) </section>;
};

include ReactRe.CreateComponent Post;

let createElement ::children => wrapProps {children: children} ::children;
