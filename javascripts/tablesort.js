document$.subscribe(function() {
  var tables = document.querySelectorAll("article table.data-table")
  tables.forEach(function(table) {
    new Tablesort(table)
  })
})