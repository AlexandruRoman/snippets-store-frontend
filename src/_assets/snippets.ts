const snippets = [
    `<div class='row'>
    <div class='column padding-reset'>
        <div class='ui huge message page grid'>
            <h1 class='ui huge header'>Hello, world!</h1>
            <p>This is a snippet</p>
            <a class='ui blue button'>Learn more »</a>
        </div>
    </div>
</div>`,

    `<div class="ui input">
    <input type="text" placeholder="Search...">
  </div>`,

    `<button class="ui button large">
Follow
</button>`,

    `<div class="ui compact menu">
<a class="item">
  <i class="icon mail"></i> Messages
  <div class="floating ui red label">22</div>
</a>
<a class="item">
  <i class="icon users"></i> Friends
  <div class="floating ui teal label">22</div>
</a>
</div>`,

    `<div class="ui vertical steps">
<div class="completed step">
  <i class="truck icon"></i>
  <div class="content">
    <div class="title">Shipping</div>
    <div class="description">Choose your shipping options</div>
  </div>
</div>
<div class="completed step">
  <i class="credit card icon"></i>
  <div class="content">
    <div class="title">Billing</div>
    <div class="description">Enter billing information</div>
  </div>
</div>
<div class="active step">
  <i class="info icon"></i>
  <div class="content">
    <div class="title">Confirm Order</div>
    <div class="description">Verify order details</div>
  </div>
</div>
</div>`,

    `<div class="ui three item menu">
    <a class="active item">Editorials</a>
    <a class="item">Reviews</a>
    <a class="item">Upcoming Events</a>
  </div>`,

    `<div class="ui checkbox">
  <input type="checkbox" name="example">
  <label>Make my profile visible</label>
</div>`,

    `<div class="ui statistic">
<div class="value">
  5,550
</div>
<div class="label">
  Downloads
</div>
</div>`,

    `<div class="ui search">
<div class="ui icon input">
  <input class="prompt" type="text" placeholder="Common passwords...">
  <i class="search icon"></i>
</div>
<div class="results"></div>
</div>`
]

export const getRandomSnippet = () => {
    return snippets[Math.floor(Math.random() * snippets.length)]
}
