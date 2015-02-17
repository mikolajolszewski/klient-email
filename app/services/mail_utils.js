angular.module('emailClientApp').service('mailUtils', function($http, $rootScope) {

  // Sort json array
  this.sortBy = function(field, reverse, primer){
     var key = primer ?
       function(x) {return primer(x[field]);} :
       function(x) {return x[field];};
     reverse = [-1, 1][+!!reverse];
     return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     };
  };

  // Function converting JSON object to DOM object with email
  this.prepareEmail = function(email) {
    var tableRow = document.createElement("tr"),
    fromCell = document.createElement("th"),
    subjectCell = document.createElement("th"),
    contentCell = document.createElement("th"),
    dateCell = document.createElement("th"),
    deleteCell = document.createElement("th"),
    date = new Date(email.received);

    if (email.read === false) {
      tableRow.className = "unread";
    } else {
      tableRow.className = "read";
    }

    tableRow.id = email.id;
    fromCell.innerHTML = email.sender;
    subjectCell.innerHTML = email.title;
    contentCell.innerHTML = email.content.substring(0,15) + '...';
    dateCell.innerHTML = date.toLocaleString();
    deleteCell.innerHTML = '<i class="icon-trash"></i>';

    tableRow.appendChild(fromCell);
    tableRow.appendChild(subjectCell);
    tableRow.appendChild(contentCell);
    tableRow.appendChild(dateCell);
    tableRow.appendChild(deleteCell);

    return(tableRow);

  };
});