
import { environtment } from 'src/environments/environtment';
const baseUrl = environtment.apiUrl;

export function getUser(): Promise<any[]> {
    return fetch(`${baseUrl}/getUsers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json());
}

export function getStatus(): Promise<any[]> {
    return fetch(`${baseUrl}/getStatus`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json());
}

export function getTimeSheets(searchCriteria: string): Promise<any[]> {
    return fetch(`${baseUrl}/getTimesheet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            searchCriteria: searchCriteria
        })
    }).then(response => response.json());
}

export function updateTimeSheet(timesheet: any): Promise<any> {
    return fetch(`${baseUrl}/updateTimesheet`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timesheet)
    }).then(response => response.json());
}

export function createTimeSheet(timesheet: any): Promise<any> {
    return fetch(`${baseUrl}/createTimesheet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(timesheet)
    }).then(response => response.json());
}

export function deleteTimeSheet(id: number): Promise<any> {
    return fetch(`${baseUrl}/deleteTimesheet/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }