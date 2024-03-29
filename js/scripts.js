// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress,
  this.physicalAddress = physicalAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();
function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id + ">"+contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

  function showContact(contactId){
    var contact = addressBook.findContact(contactId);
    $('#show-contact').show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    $(".email-address").html(contact.emailAddress);
    $(".physical-address").html(contact.physicalAddress);
    var buttons = $('#buttons');
    buttons.empty();
    buttons.append("<button class ='deleteButton' id=" + + contact.id +">Delete</button>");
  }

  function attachContactListeners() {
    $('ul#contacts').on("click", 'li', function(){
       showContact(this.id);
    });
    $('#buttons').on('click', '.deleteButton', function() {
      addressBook.deleteContact(this.id);
      $('#show-contact').hide();
      displayContactDetails(addressBook);
    });
  };


$(document).ready(function() {
  attachContactListeners();
  // console.log($('input:checkbox[name=email1]').prop('checked'));
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();

    var inputtedEmailAddress1 = $("input#new-email-address1").val();
    var inputtedEmailAddress2 = $("input#new-email-address2").val();
    var inputtedEmailAddresses = ("<br>Personal: " + inputtedEmailAddress1 + "<br>Work: " + inputtedEmailAddress2)
    console.log(inputtedEmailAddresses)

    var inputtedPhysicalAddress1 = $("input#new-physical-address1").val();
    var inputtedPhysicalAddress2 = $("input#new-physical-address2").val();
    var inputtedPhysicalAddress = ("<br>Home: " + inputtedPhysicalAddress1 + "<br>Work: " + inputtedPhysicalAddress2)
    var newContact = new Contact(inputtedFirstName,     inputtedLastName, inputtedPhoneNumber, inputtedEmailAddresses, inputtedPhysicalAddress);

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address1").val("");
    $("input#new-email-address2").val("");
    $("input#new-physical-address1").val("");
    $("input#new-physical-address2").val("");

    addressBook.addContact(newContact);

// //trying to figure out logic if work is checked.
//     if ($('input:checkbox[name=email1]').prop('checked')) {
//       inputtedEmailAddress1 = ("Work: " + inputtedEmailAddress1);
//       console.log(InputtedEmailAddress1);
//     }

    displayContactDetails(addressBook);
  })
})
