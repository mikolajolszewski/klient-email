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
  this.prepareEmail = function(email, box) {
    var tableRow = document.createElement("tr"),
    mailCell = document.createElement("th"),
    subjectCell = document.createElement("th"),
    contentCell = document.createElement("th"),
    dateCell = document.createElement("th"),
    deleteCell = document.createElement("th"),
    date = (new Date(email.received)).toLocaleString();

    if (email.read === false) {
      tableRow.className = "unread";
    } else {
      tableRow.className = "read";
    }

    tableRow.id = email.id;
    if (box === "inbox") {
      mailCell.innerHTML = email.sender;
    } else if (box === "outbox") {
      mailCell.innerHTML = email.receivers;
    }
    subjectCell.innerHTML = email.title.substring(0,15) + '...';
    contentCell.innerHTML = email.content.substring(0,15) + '...';
    dateCell.innerHTML = date.substring(0, date.length - 4);
    deleteCell.innerHTML = '<i class="icon-trash"></i>';
    deleteCell.className = 'delete_cell';

    tableRow.appendChild(mailCell);
    tableRow.appendChild(subjectCell);
    tableRow.appendChild(contentCell);
    tableRow.appendChild(dateCell);
    if (box === "inbox") {
      tableRow.appendChild(deleteCell);
    }

    return(tableRow);

  };
});