module App = {
  module Blog = {
    include ReactRe.Component;
    let name = "Blog";
    type props = unit;
    let render _ => <TestPost />;
  };
  include ReactRe.CreateComponent Blog;
  let createElement = wrapProps ();
};

ReactDOMRe.renderToElementWithId <App /> "app";
