// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Implements a 3D ray that are compatible with WebGL.
 * Each element is a float32 since that is typically the desired size of a
 * 3-vector in the GPU.  The API is structured to avoid unnecessary memory
 * allocations.  The last parameter will typically be the output vector and
 * an object can be both an input and output parameter to all methods except
 * where noted.
 *
 */
goog.provide('goog.vec.Ray');

goog.require('goog.vec.Vec3');



/**
 * Constructs a new ray with an optional origin and direction. If not specified,
 * the default is [0, 0, 0].
 * @param {goog.vec.ArrayType=} opt_origin The optional origin.
 * @param {goog.vec.ArrayType=} opt_dir The optional direction.
 * @constructor
 */
goog.vec.Ray = function(opt_origin, opt_dir) {
  /**
   * @type {goog.vec.Vec3.Type}
   */
  this.origin = goog.vec.Vec3.createFromArray(
      opt_origin || [0, 0, 0]);

  /**
   * @type {goog.vec.Vec3.Type}
   */
  this.dir = goog.vec.Vec3.createFromArray(
      opt_dir || [0, 0, 0]);
};


/**
 * Sets the origin and direction of the ray.
 * @param {goog.vec.ArrayType} origin The new origin.
 * @param {goog.vec.ArrayType} dir The new direction.
 */
goog.vec.Ray.prototype.set = function(origin, dir) {
  goog.vec.Vec3.setFromArray(this.origin, origin);
  goog.vec.Vec3.setFromArray(this.dir, dir);
};


/**
 * Sets the origin of the ray.
 * @param {goog.vec.ArrayType} origin the new origin.
 */
goog.vec.Ray.prototype.setOrigin = function(origin) {
  goog.vec.Vec3.setFromArray(this.origin, origin);
};


/**
 * Sets the direction of the ray.
 * @param {goog.vec.ArrayType} dir The new direction.
 */
goog.vec.Ray.prototype.setDir = function(dir) {
  goog.vec.Vec3.setFromArray(this.dir, dir);
};


/**
 * Returns true if this ray is equal to the other ray.
 * @param {goog.vec.Ray} other The other ray.
 * @return {boolean} True if this ray is equal to the other ray.
 */
goog.vec.Ray.prototype.equals = function(other) {
  return other != null &&
      goog.vec.Vec3.equals(this.origin, other.origin) &&
      goog.vec.Vec3.equals(this.dir, other.dir);
};
