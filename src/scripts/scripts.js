// import $ from 'jquery';

(function (document) {
  const toggle = document.querySelector('.sidebar-toggle')
  const sidebar = document.querySelector('#sidebar')
  const checkbox = document.querySelector('#sidebar-checkbox')

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target
      if (
        !checkbox.checked ||
        sidebar.contains(target) ||
        (target === checkbox || target === toggle)
      ) {
        return
      }
      checkbox.checked = false
    },
    false
  )
}(document))
