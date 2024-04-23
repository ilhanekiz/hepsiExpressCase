import * as Noty from 'noty';
import { ListItem } from '../../pages/list/list.model';

export const UpVote = (listItem: ListItem) => {
  listItem.points+=1
  return listItem;
}

export const DownVote = (listItem: ListItem) => {
  if (listItem && listItem.points === 0) return listItem;
  listItem.points-=1
  return listItem;
}

export const AlphabeticalOrder = (listItem: ListItem[], key: string, type: string = 'normal') => {
  if (type !== 'normal') return listItem.sort((a: any, b: any) => b[key].localeCompare(a[key]));
  return listItem.sort((a: any, b: any) => a[key].localeCompare(b[key]));
}

export const NumberOrder = (listItem: ListItem[], key: string, type: string = 'decreasing') => {
  if (type !== 'decreasing') return listItem.sort((a: any, b: any) => a[key] - b[key]);
  return listItem.sort((a: any, b: any) => b[key] - a[key]);
}

export const SuccessNoty = (title: string, message: string) => {
  new Noty({
    type: 'success',
    layout: 'topCenter',
    timeout: 1500,
    text: `${title} ${message}`
  }).show();
}
