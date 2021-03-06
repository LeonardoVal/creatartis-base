﻿/** # Math

Mathematical and numerical functions and utilities.
*/
var math = exports.math = {};

// ## Conditionals #################################################################################

/** Clamps forces a `value` to be between `min` and `max`.
*/
math.clamp = function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
};

/** A simple function to calculate the sign of a number. See [Math.sign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign).
*/
math.sign = function sign(x) {
	x = +x;
	return (x === 0 || isNaN(x)) ? x : x > 0 ? 1 : -1;
};

// ## Combinatorics ################################################################################

/** The `factorial` functions needs little introduction. It receives `n` and returns `n!`. Argument
`b` can be used to stop the recursion before zero, which is useful to calculate `n!/b!` efficiently.
*/
var factorial = math.factorial = function factorial(n, b) {
	n = n|0;
	b = Math.max(0, b|0);
	if (n < 0) {
		return NaN;
	} else {
		for (var f = 1; n > b; --n) {
			f *= n;
		}
		return f;
	}
};

/** The `combinations` of selecting `k` elements from a set of `n`, not mattering in which order. It
is calculated as `n!/k!/(n-k)!`.
*/
math.combinations = function combinations(n, k) {
	return factorial(n, k) / factorial(n - k);
};

// ## Probability ##################################################################################

/** The probability density function (or PDF) of the normal (or gaussian) distribution. The 
parameters `mean` and `variance` default to the standard normal (i.e `mean=0` and `variance=1`).
*/
math.gauss_pdf = function gauss_pdf(value, mean, variance) {
	mean = isNaN(mean) ? 0 : +mean;
	variance = isNaN(variance) ? 1 : +variance;
	var standardDeviation = Math.sqrt(variance);

    return Math.exp(-Math.pow(x - mean, 2) / (2 * variance)) / 
		standardDeviation * Math.sqrt(2 * Math.PI);
};

/** Complementary error function routine based on Chebyshev fitting as explained in 
[Numerical Recipes in C (2nd edition)](http://www.nr.com/), with fractional error everywhere less 
than 1.2e-7.
*/
math.gauss_erfc = function gauss_erfc(value) {
	var z = Math.abs(value),
		t = 1.0 / (1.0 + 0.5 * z),
		ans = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 +
			t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + 
			t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return value >= 0.0 ? ans : 2.0 - ans;
};

/** The cumulative density function (or CDF) of the normal (or gaussian) distribution. The 
parameters `mean` and `variance` default to the standard normal (i.e `mean=0` and `variance=1`).
*/
math.gauss_cdf = function gauss_cdf(value, mean, variance) {
	mean = isNaN(mean) ? 0 : +mean;
	variance = isNaN(variance) ? 1 : +variance;
	var standardDeviation = Math.sqrt(variance);
	
	return math.gauss_erfc(-(value - mean) / (standardDeviation * Math.sqrt(2))) / 2;
};
