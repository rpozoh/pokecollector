import { Component, OnInit } from '@angular/core';
import { TypeService } from './../../../services/type.service';
import { RegionService } from './../../../services/region.service';
import { Type } from '../../../interfaces/type.interface';
import { Region } from '../../../interfaces/region.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  public listTypes : Type[] = [];
  public listRegions : Region[] = [];

  constructor(private _typeService : TypeService,
              private _regionService : RegionService) {}

  ngOnInit(): void {
    this._typeService.getAllTypes().subscribe(getTypeData => {
      this.listTypes = getTypeData;
    });

    this._regionService.getAllRegions().subscribe(getRegionData => {
      this.listRegions = getRegionData;
    });
  }
}