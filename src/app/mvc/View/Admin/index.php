<?php
$title    = "Admin";
$styles   = ['editablegrid-2.0.1.css', 'admin.css'];
$scripts  = ['jquery.form.min.js', 'helper.js', 'customer.js', 'contact.js', 'person.js', 'grid.js', 'admin.js'];
ob_start();
?>
<div>
    <table id="customers" class="grid">
        <tr>
            <th colspan="5">CUSTOMERS</th>
        </tr>
        <tr id="customer-form-controls">
            <th>
                <a id="sort-name" class="sort" href="#">NAME</a>
                <a id="filter-name" href="#">
                    <img class="filter" src="<?php echo IMAGES.'filter.png'; ?>">
                </a>
            </th>
            <th>
                <a id="sort-phone-number" class="sort" href="#">PHONE NUMBER</a>
                <a id="filter-phone-number" href="#">
                    <img class="filter" src="<?php echo IMAGES.'filter.png'; ?>">
                </a>
            </th>
            <th>
                <a id="sort-registration-number" class="sort" href="#">REGISTRATION NUMBER</a>
                <a id="filter-registration-number" href="#">
                    <img class="filter" src="<?php echo IMAGES.'filter.png'; ?>">
                </a>
            </th>
            <th>
                <a id="sort-country" class="sort" href="#">ADDRESS(COUNTRY)</a>
                <a id="filter-country" href="#">
                    <img class="filter" src="<?php echo IMAGES.'filter.png'; ?>">
                </a>
            </th>
            <th>CONTROLS</th>
        </tr>
        <tr id="customer-0">
            <td>
                <input id="customer-name" name="customer-name" value="customer name" maxlength="20">
            </td>
            <td>
                 <input id="customer-phone-number" name="customer-phone-number" value="+00-000-00-00" maxlength="14">
            </td>
            <td>
                <input id="customer-registration-number" name="customer-registration-number" value="0" maxlength="20">
            </td>
            <td>
                <select id="countries"></select>
            </td>
            <td colspan="5">
                <div style="text-align: left;">
                    <a id="add-customer" href="#">
                        <img class="crud" src="<?php echo IMAGES.'add.png'; ?>">
                    </a>
                </div>
            </td>
        </tr>
        <tr id="customer-tr">
            <td class="customer-td">{{name}}</td>
            <td class="customer-td">{{pn}}</td>
            <td class="customer-td">{{rn}}</td>
            <td class="customer-td">{{address}}</td>
            <td>
                <div style="text-align: center;">
                    <a class="update" id="customer-{{-update-}}" href="{{update}}">
                        <img class="crud" src="<?php echo IMAGES.'update.png'; ?>">
                    </a>
                    <a class="contact" id="customer-{{-contact-}}" href="{{contact}}">
                        <img class="crud" src="<?php echo IMAGES.'contact.png'; ?>">
                    </a>
                    <a class="delete" id="customer-{{-delete-}}" href="{{delete}}">
                        <img class="crud" src="<?php echo IMAGES.'delete.png'; ?>">
                    </a>
                 </div>
            </td>
        </tr>
        <tr id="contacts-0">
            <td colspan="5">
                <table id="contacts-table" style="float: right;">
                    <tr>
                        <th>
                            <a id="sort-firstname" class="sort" href="#">FISRTNAME</a>
                            <a id="filter-firstname" href="#">
                                <img class="filter" src="<?php echo IMAGES.'filter.png'; ?>">
                            </a>
                        </th>
                        <th>
                            <a id="sort-lastname" class="sort" href="#">LASTNAME</a>
                            <a id="filter-lasttname" href="#">
                                <img class="filter" src="<?php echo IMAGES.'filter.png'; ?>">
                            </a>
                        </th>
                        <th>
                            <a id="sort-birthday" class="sort" href="#">BIRTHDAY</a>
                            <a id="filter-birthday" href="#">
                                <img class="filter" src="<?php echo IMAGES.'filter.png'; ?>">
                            </a>
                        </th>
                        <th>
                            <a id="sort-position" class="sort" href="#">POSITON</a>
                            <a id="filter-position" href="#">
                                <img class="filter" src="<?php echo IMAGES.'filter.png'; ?>">
                            </a>
                        </th>
                        <th>CONTROLS</th>
                    </tr>
                    <tr id="contacts-0-0">
                        <td><input type="text" id="firstname" name="firstname" maxlength="50" value="firstname"></td>
                        <td><input type="text" id="lastname" name="lastname" maxlength="50" value="lastname"></td>
                        <td><input type="text" id="birthday" name="birthday" maxlength="10" value="1900-12-30"></td>
                        <td><input type="text" id="position" name="position" maxlength="50" value="position"></td>
                        <td>
                            <div style="text-align: left;">
                                <a id="add-contact" href="#">
                                    <img class="crud" src="<?php echo IMAGES.'add.png'; ?>">
                                </a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr id="contacts-tr">
            <td class="contact-td">{{firstname}}</td>
            <td class="contact-td">{{lastname}}</td>
            <td class="contact-td">{{birthday}}</td>
            <td class="contact-td">{{position}}</td>
            <td>
                <div style="text-align: center;">
                    <a class="update" id="contact-{{-update-}}" href="{{update}}">
                        <img class="crud" src="<?php echo IMAGES.'update.png'; ?>">
                    </a>
                    <a class="delete" id="contact-{{-delete-}}" href="{{delete}}">
                        <img class="crud" src="<?php echo IMAGES.'delete.png'; ?>">
                    </a>
                </div>
            </td>
        </tr>
    </table>
</div>
<input type="hidden" id="controllerRoute" value="<?=WEB?>">
<?php
$content = ob_get_clean();
include LAYOUT;

