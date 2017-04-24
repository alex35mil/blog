let title = "Test Post Title";

module TestPost = {
  include ReactRe.Component;
  let name = "TestPost";
  type props = unit;
  let render _ =>
    <Post>
      <Header> <H1> (ReactRe.stringToElement title) </H1> </Header>
      <P> (ReactRe.stringToElement "Test Post Body") </P>
    </Post>;
};

include ReactRe.CreateComponent TestPost;

let createElement = wrapProps ();
