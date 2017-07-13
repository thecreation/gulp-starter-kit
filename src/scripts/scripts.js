// import $ from 'jquery';

(function(document) {
  let toggle = document.querySelector('.sidebar-toggle');
  let sidebar = document.querySelector('#sidebar');
  let checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener(
    'click',
    function(e) {
      let target = e.target;
      if (
        !checkbox.checked ||
        sidebar.contains(target) ||
        (target === checkbox || target === toggle)
      ) {
        return;
      }
      checkbox.checked = false;
    },
    false
  );
})(document);
