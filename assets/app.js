(function(){
  const files = ['a','b','c','d','e','f','g','h'];
  const ranks = ['1','2','3','4','5','6','7','8'];
  let orientation = 'white';
  const game = new window.Chess();

  const boardEl = document.getElementById('board');
  const btnNew = document.getElementById('btnNew');
  const btnFlip = document.getElementById('btnFlip');
  const starsEl = document.getElementById('stars');

  // Stars
  (function makeStars(){
    let seed = 12345;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i=0;i<120;i++){
      const d = document.createElement('div');
      d.className = 'star';
      d.style.left = (rnd()*100).toFixed(2) + '%';
      d.style.top = (rnd()*70).toFixed(2) + '%';
      d.style.animationDelay = (rnd()*4).toFixed(2) + 's';
      const size = 1 + Math.round(rnd()*1.5);
      d.style.width = size + 'px';
      d.style.height = size + 'px';
      starsEl.appendChild(d);
    }
  })();

  function makeSquares() {
    const list = [];
    for (let r=7; r>=0; r--) for (let f=0; f<8; f++) list.push(files[f]+ranks[r]);
    return orientation === 'black' ? list.reverse() : list;
  }

  function render() {
    boardEl.innerHTML = '';
    const squares = makeSquares();
    const state = game.board(); // array[8][8] top->bottom
    squares.forEach((sq, idx) => {
      const el = document.createElement('div');
      el.className = 'square ' + (((Math.floor(idx/8)+idx)%2===0) ? 'light':'dark');
      el.setAttribute('data-square', sq);
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', sq);

      const f = files.indexOf(sq[0]);
      const r = ranks.indexOf(sq[1]);
      const p = state[7-r]?.[f] || null;
      if (p) {
        const map = {k:'K',q:'Q',r:'R',b:'B',n:'N',p:'P'};
        const code = (p.color === 'w' ? 'w':'b') + map[p.type].toUpperCase();
        el.innerHTML = window.pieceSVG(code);
      }
      el.addEventListener('click', onSquareClick, {passive:true});
      boardEl.appendChild(el);
    });
  }

  let selected = null;
  let legalMoves = [];

  function clearHighlights() {
    document.querySelectorAll('.square').forEach(s=>s.classList.remove('selected'));
    document.querySelectorAll('.square .hint').forEach(h=>h.remove());
  }

  function showHints() {
    legalMoves.forEach(m => {
      const toEl = document.querySelector('.square[data-square="'+m.to+'"]');
      if (toEl) {
        const dot = document.createElement('div');
        dot.className = 'hint';
        toEl.appendChild(dot);
      }
    });
  }

  function onSquareClick(e) {
    const sq = e.currentTarget.getAttribute('data-square');
    const piece = game.get(sq);
    const isOwn = piece && piece.color === game.turn();

    if (selected) {
      const legal = legalMoves.find(m => m.to === sq);
      if (legal) {
        game.move({ from: selected, to: sq, promotion: 'q' });
        selected = null;
        legalMoves = [];
        clearHighlights();
        render();
        return;
      }
      if (isOwn) {
        selected = sq;
        legalMoves = game.moves({ square: sq, verbose: true });
        clearHighlights();
        document.querySelector('.square[data-square="'+sq+'"]')?.classList.add('selected');
        showHints();
      } else {
        selected = null;
        legalMoves = [];
        clearHighlights();
      }
      return;
    }

    if (isOwn) {
      selected = sq;
      legalMoves = game.moves({ square: sq, verbose: true });
      clearHighlights();
      document.querySelector('.square[data-square="'+sq+'"]')?.classList.add('selected');
      showHints();
    }
  }

  btnNew.addEventListener('click', () => {
    game.reset(); selected = null; legalMoves = []; clearHighlights(); render();
  });
  btnFlip.addEventListener('click', () => {
    orientation = (orientation === 'white') ? 'black' : 'white';
    selected = null; legalMoves = []; clearHighlights(); render();
  });

  render();
})();