import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class WindowStateService {
  
  private windowVisibleState:WritableSignal<Map<string, boolean>> = signal(new Map());

  registerWindow(windowId:string) {
    if (windowId === '') return;
    this.windowVisibleState.update((stateMap) => stateMap.set(windowId, false));
  }

  setIsWindowVisible(windowId:string, isVisible:boolean) {
    if (windowId === '') return;
    this.windowVisibleState.update((stateMap) => stateMap.set(windowId, isVisible));
  }
  getIsWindowVisible(windowId:string): boolean {
    if (windowId === '') return false;
    return this.windowVisibleState().get(windowId) ?? false;
  }
}
