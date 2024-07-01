/*! Copyright [Amazon.com](http://amazon.com/), Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0 */
export const assets: { [filepath: string]: string } = {
  "README.md": `# PDK Blueprint

TODO

## Additional resources

Refer to https://aws.github.io/aws-pdk/developer_guides/monorepo/index.html
`,
  "approved-licenses.yaml": `---
- - :permit
  - LicenseRef-.amazon.com.-AmznSL-1.0
- - :permit
  - Amazon Software License
- - :permit
  - AFL-2.0
- - :permit
  - AFL-3.0
- - :permit
  - ANTLR-PD
- - :permit
  - Apache-1.1
- - :permit
  - Apache-2.0
- - :permit
  - LLVM-exception
- - :permit
  - Artistic-1.0
- - :permit
  - Artistic-1.0-Perl
- - :permit
  - BSL-1.0
- - :permit
  - BSD-2-Clause
- - :permit
  - Simplified BSD
- - :permit
  - Free BSD
- - :permit
  - New BSD
- - :permit
  - BSD-3-Clause
- - :permit
  - MIT-CMU
- - :permit
  - MIT-0
- - :permit
  - Eclipse Public License - v 2.0
- - :permit
  - EPL 2.0
- - :permit
  - GPL2 w/ CPE
- - :permit
  - CDDL License
- - :permit
  - CDDL + GPLv2 with classpath exception
- - :permit
  - Eclipse Public License v2.0
- - :permit
  - CPOL-1.02
- - :permit
  - CC-BY-2.0
- - :permit
  - CC-BY-2.5
- - :permit
  - CC-BY-3.0
- - :permit
  - CC-BY-4.0
- - :permit
  - CC0-1.0
- - :permit
  - curl
- - :permit
  - EFL-2.0
- - :permit
  - FTL
- - :permit
  - HPND-sell-variant
- - :permit
  - ImageMagick
- - :permit
  - ISC
- - :permit
  - IJG
- - :permit
  - HTMLTIDY
- - :permit
  - JSON
- - :permit
  - CNRI-Jython
- - :permit
  - libtiff
- - :permit
  - MS-PL
- - :permit
  - MIT
- - :permit
  - ICU
- - :permit
  - X11
- - :permit
  - MulanPSL-2.0
- - :permit
  - OpenSSL
- - :permit
  - PDDL-1.0
- - :permit
  - PHP-3.0
- - :permit
  - PostgreSQL
- - :permit
  - PIL
- - :permit
  - PSF-2.0
- - :permit
  - PSF-2.1.1
- - :permit
  - Ruby
- - :permit
  - Scala
- - :permit
  - OFL-1.1
- - :permit
  - SLF4J
- - :permit
  - blessing
- - :permit
  - SMLNJ
- - :permit
  - TCL
- - :permit
  - NCSA
- - :permit
  - Unlicense
- - :permit
  - Vim
- - :permit
  - W3C-19980720
- - :permit
  - W3C
- - :permit
  - W3C-20150513
- - :permit
  - WTFPL
- - :permit
  - Zlib
- - :permit
  - ZPL-2.1
- - :permit
  - Python-2.0
- - :permit
  - Python Software Foundation License
- - :permit
  - APACHEv2
- - :permit
  - 0BSD
- - :permit
  - BSD Zero Clause License
- - :permit
  - Unicode-DFS-2015
- - :permit
  - Unicode-DFS-2016
- - :permit
  - Unicode Data Files
- - :permit
  - WTFPL-2.0
- - :permit
  - WT*PL
- - :permit
  - libjpeg
- - :permit
  - zlib-acknowledgement
- - :permit
  - libpng
- - :permit
  - bzip2
- - :permit
  - Spencer-94
- - :permit
  - BouncyCastle
- - :permit
  - NTP
- - :permit
  - BSD-2-Clause-FreeBSD
- - :permit
  - BSD-3-Clause-Attribution
- - :permit
  - BSD-1-Clause
- - :permit
  - BSD-Source-Code
- - :permit
  - EDL
- - :permit
  - HDF5
- - :permit
  - OLDAP-2.8
- - :approve
  - "monorepo"
- - :approve
  - "@nx/nx-darwin-arm64"
- - :approve
  - "@nx/nx-linux-x64-gnu"
- - :approve
  - "@nx/nx-linux-x64-musl"
- - :approve
  - "axe-core"
- - :approve
  - "jackspeak"
- - :approve
  - "path-scurry"
- - :approve
  - "@aws-lambda-powertools/commons"
- - :approve
  - "@aws-lambda-powertools/logger"
- - :approve
  - "@aws-lambda-powertools/metrics"
- - :approve
  - "@aws-lambda-powertools/tracer"
- - :approve
  - "asn1"
- - :approve
  - "assert-plus"
- - :approve
  - "aws-sign"
- - :approve
  - "boom"
- - :approve
  - "cheerio"
- - :approve
  - "colors"
- - :approve
  - "combined-stream"
- - :approve
  - "cookie-jar"
- - :approve
  - "cryptiles"
- - :approve
  - "ctype"
- - :approve
  - "delayed-stream"
- - :approve
  - "esprima"
- - :approve
  - "forever-agent"
- - :approve
  - "hawk"
- - :approve
  - "hoek"
- - :approve
  - "http-signature"
- - :approve
  - "json-stringify-safe"
- - :approve
  - "jsonify"
- - :approve
  - "oauth-sign"
- - :approve
  - "request"
- - :approve
  - "sntp"
- - :approve
  - "tunnel-agent"
- - :approve
  - "aenum"
- - :approve
  - "wrapt"
- - :approve
  - "package-json-from-dist"
- - :approve
  - "BlueOak"`,
};

export const ASL = `Amazon Software License 1.0

This Amazon Software License ("License") governs your use, reproduction, and
distribution of the accompanying software as specified below.

1. Definitions

  "Licensor" means any person or entity that distributes its Work.

  "Software" means the original work of authorship made available under this
  License.

  "Work" means the Software and any additions to or derivative works of the
  Software that are made available under this License.

  The terms "reproduce," "reproduction," "derivative works," and
  "distribution" have the meaning as provided under U.S. copyright law;
  provided, however, that for the purposes of this License, derivative works
  shall not include works that remain separable from, or merely link (or bind
  by name) to the interfaces of, the Work.

  Works, including the Software, are "made available" under this License by
  including in or with the Work either (a) a copyright notice referencing the
  applicability of this License to the Work, or (b) a copy of this License.

2. License Grants

  2.1 Copyright Grant. Subject to the terms and conditions of this License,
  each Licensor grants to you a perpetual, worldwide, non-exclusive,
  royalty-free, copyright license to reproduce, prepare derivative works of,
  publicly display, publicly perform, sublicense and distribute its Work and
  any resulting derivative works in any form.

  2.2 Patent Grant. Subject to the terms and conditions of this License, each
  Licensor grants to you a perpetual, worldwide, non-exclusive, royalty-free
  patent license to make, have made, use, sell, offer for sale, import, and
  otherwise transfer its Work, in whole or in part. The foregoing license
  applies only to the patent claims licensable by Licensor that would be
  infringed by Licensor's Work (or portion thereof) individually and
  excluding any combinations with any other materials or technology.

3. Limitations

  3.1 Redistribution. You may reproduce or distribute the Work only if
  (a) you do so under this License, (b) you include a complete copy of this
  License with your distribution, and (c) you retain without modification
  any copyright, patent, trademark, or attribution notices that are present
  in the Work.

  3.2 Derivative Works. You may specify that additional or different terms
  apply to the use, reproduction, and distribution of your derivative works
  of the Work ("Your Terms") only if (a) Your Terms provide that the use
  limitation in Section 3.3 applies to your derivative works, and (b) you
  identify the specific derivative works that are subject to Your Terms.
  Notwithstanding Your Terms, this License (including the redistribution
  requirements in Section 3.1) will continue to apply to the Work itself.

  3.3 Use Limitation. The Work and any derivative works thereof only may be
  used or intended for use with the web services, computing platforms or
  applications provided by Amazon.com, Inc. or its affiliates, including
  Amazon Web Services, Inc.

  3.4 Patent Claims. If you bring or threaten to bring a patent claim against
  any Licensor (including any claim, cross-claim or counterclaim in a
  lawsuit) to enforce any patents that you allege are infringed by any Work,
  then your rights under this License from such Licensor (including the
  grants in Sections 2.1 and 2.2) will terminate immediately.

  3.5 Trademarks. This License does not grant any rights to use any
  Licensor's or its affiliates' names, logos, or trademarks, except as
  necessary to reproduce the notices described in this License.

  3.6 Termination. If you violate any term of this License, then your rights
  under this License (including the grants in Sections 2.1 and 2.2) will
  terminate immediately.

4. Disclaimer of Warranty.

  THE WORK IS PROVIDED "AS IS" WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
  EITHER EXPRESS OR IMPLIED, INCLUDING WARRANTIES OR CONDITIONS OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE OR
  NON-INFRINGEMENT. YOU BEAR THE RISK OF UNDERTAKING ANY ACTIVITIES UNDER
  THIS LICENSE. SOME STATES' CONSUMER LAWS DO NOT ALLOW EXCLUSION OF AN
  IMPLIED WARRANTY, SO THIS DISCLAIMER MAY NOT APPLY TO YOU.

5. Limitation of Liability.

  EXCEPT AS PROHIBITED BY APPLICABLE LAW, IN NO EVENT AND UNDER NO LEGAL
  THEORY, WHETHER IN TORT (INCLUDING NEGLIGENCE), CONTRACT, OR OTHERWISE
  SHALL ANY LICENSOR BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY DIRECT,
  INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR
  RELATED TO THIS LICENSE, THE USE OR INABILITY TO USE THE WORK (INCLUDING
  BUT NOT LIMITED TO LOSS OF GOODWILL, BUSINESS INTERRUPTION, LOST PROFITS
  OR DATA, COMPUTER FAILURE OR MALFUNCTION, OR ANY OTHER COMM ERCIAL DAMAGES
  OR LOSSES), EVEN IF THE LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF
  SUCH DAMAGES.`;
