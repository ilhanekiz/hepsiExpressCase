import { Component, OnInit } from '@angular/core';
import { ListService } from '../list/list.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ListItem } from '../list/list.model';

import { SuccessNoty } from '../../common/utils/utils'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [ListService]
})
export class AddComponent implements OnInit {

  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.urlRegex)],
    }),
  });

  constructor(private ListService: ListService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formValidationCheck()) return;
    const linkData: ListItem = {
      id: uuidv4(),
      title: this.addForm.value.name,
      points: 0,
      link: this.addForm.value.url
    }
    this.ListService.addListItem(linkData);
    SuccessNoty(this.addForm.value.name, 'added.');
    this.addForm.reset();
  }

  formValidationCheck = () => {
    const formValue = this.addForm.value;
    const name = formValue.name;
    const url = formValue.url;
    return name === '' || url === '';
  }
}
