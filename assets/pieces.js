(function(){
  function wrap(g){ return '<svg viewBox="0 0 100 100" class="piece" xmlns="http://www.w3.org/2000/svg">'+g+'</svg>'; }
  window.pieceSVG = function(code){
    if (!code) return "";
    const side = code[0] === 'w' ? 'w' : 'b';
    const type = code[1].toLowerCase();
    const fill = side === 'w' ? '#f4e3c1' : '#3b2b1c';
    const stroke = '#1c120c';
    const crown = '#d1a325';
    const eye = side === 'w' ? '#1c120c' : '#f7ead2';
    const cheek = side === 'w' ? '#e7cda3' : '#5a3e2c';
    if (type === 'k') return wrap('<g stroke="'+stroke+'" stroke-width="2"><polygon points="40,18 50,8 60,18 70,10 72,26 28,26 30,10" fill="'+crown+'" /><circle cx="50" cy="50" r="24" fill="'+fill+'" /></g>');
    if (type === 'q') return wrap('<g stroke="'+stroke+'" stroke-width="2"><polygon points="30,18 40,8 50,18 60,8 70,18 74,28 26,28" fill="'+crown+'" /><ellipse cx="50" cy="58" rx="26" ry="22" fill="'+fill+'" /></g>');
    if (type === 'r') return wrap('<g stroke="'+stroke+'" stroke-width="2"><rect x="44" y="50" width="12" height="26" fill="#5b3a2a" rx="3" /><circle cx="50" cy="40" r="22" fill="#2f6b3f" /></g>');
    if (type === 'b') return wrap('<g stroke="'+stroke+'" stroke-width="2"><ellipse cx="50" cy="60" rx="20" ry="22" fill="'+fill+'" /><path d="M30 34 C42 18, 58 18, 70 34 L60 38 C52 30, 48 30, 40 38 Z" fill="#b43b6a" /></g>');
    if (type === 'n') return wrap('<g stroke="'+stroke+'" stroke-width="2"><path d="M30 56 C30 40, 44 34, 56 36 C66 38, 72 44, 72 56 C72 70, 62 78, 48 80 C36 82, 30 74, 30 66 Z" fill="'+fill+'" /></g>');
    if (type === 'p') return wrap('<g stroke="'+stroke+'" stroke-width="2"><circle cx="50" cy="40" r="20" fill="'+fill+'" /></g>');
    return "";
  };
})();