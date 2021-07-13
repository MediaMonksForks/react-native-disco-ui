//
//  RNDiscoUIModule.swift
//  RNDiscoUIModule
//
//  Copyright © 2021 Robert O'Connor. All rights reserved.
//

import Foundation

@objc(RNDiscoUIModule)
class RNDiscoUIModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
