class Page {
  constructor(url) {
    this.url = 'app/views/' + url;
  }

  load() {
    return $.get(this.url).then(res => this.html = res);
  }  

  show(el) {
    el.innerHTML = this.html;
  }
}

export default Page;