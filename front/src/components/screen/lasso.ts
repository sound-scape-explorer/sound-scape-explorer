type Point2d = [number, number];

const getContext = (c: HTMLCanvasElement) => {
  const context = c.getContext('2d');

  if (context === null) {
    throw new Error('could not load context');
  }

  return context;
};

const normalize2d = (xy: Point2d, width: number, height: number) => {
  // gl's normalized device coordinates, [-1, 1]
  return [(xy[0] / width) * 2 - 1, 1 - (xy[1] / height) * 2];
};

export class LassoSelector {
  canvas: HTMLCanvasElement;

  points: Point2d[];

  context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.points = [];
    this.context = getContext(canvas);
    this.close();
  }

  mouseMove(e: MouseEvent) {
    this.points.push([e.clientX, e.clientY]);
  }

  close() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.points = [];
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.lineWidth = 1.5;
    this.context.strokeStyle = 'rgba(255, 0, 0, 1)';
    this.context.fillStyle = 'rgba(255, 0, 0, 0.5)';
    this.context.beginPath();

    for (const point of this.points) {
      this.context.lineTo(point[0], point[1]);
    }

    this.context.closePath();
    this.context.fill();
    this.context.stroke();
  }

  getData(width: number, height: number) {
    return this.points;
    // return this.points.map((xy) => normalize2d(xy, width, height));
  }
}

// export class CircleSelector {
//   canvas: any;
//
//   points: any[];
//
//   begin: any;
//
//   end: any;
//
//   constructor(canvas) {
//     this.canvas = canvas;
//     this.points = [];
//     this.begin = null;
//     this.end = null;
//   }
//
//   mouseMove(x, y) {
//     if (!this.begin) {
//       this.begin = [x, y];
//     } else {
//       this.end = [x, y];
//     }
//   }
//
//   close() {
//     const ctx = this.canvas.getContext('2d');
//     ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.begin = null;
//     this.end = null;
//   }
//
//   draw() {
//     if (this.begin && this.end) {
//       const ctx = this.canvas.getContext('2d');
//       ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       ctx.lineWidth = 1.5;
//       ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
//       ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
//       ctx.beginPath();
//       const dx = this.begin[0] - this.end[0];
//       const dy = this.begin[1] - this.end[1];
//       const r = Math.sqrt(dx * dx + dy * dy);
//       ctx.arc(this.begin[0], this.begin[1], r, 0, 2 * Math.PI);
//       ctx.fill();
//       ctx.stroke();
//     }
//   }
//
//   getData(width, height) {
//     const data = {
//       type: 'circle',
//       pixel: {begin: this.begin, end: this.end},
//       device: {
//         begin: _scale_point(this.begin, width, height),
//         end: _scale_point(this.end, width, height),
//       },
//     };
//     return data;
//   }
// }
//
// export class RectangleSelector {
//   canvas: any;
//
//   points: any[];
//
//   begin: any;
//
//   end: any;
//
//   constructor(canvas) {
//     this.canvas = canvas;
//     this.points = [];
//     this.begin = null;
//     this.end = null;
//   }
//
//   mouseMove(x, y) {
//     if (!this.begin) {
//       this.begin = [x, y];
//     } else {
//       this.end = [x, y];
//     }
//   }
//
//   close() {
//     const ctx = this.canvas.getContext('2d');
//     ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.begin = null;
//     this.end = null;
//   }
//
//   draw() {
//     if (this.begin && this.end) {
//       const ctx = this.canvas.getContext('2d');
//       ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//       ctx.lineWidth = 1.5;
//       ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
//       ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
//       ctx.beginPath();
//       ctx.rect(
//         this.begin[0],
//         this.begin[1],
//         this.end[0] - this.begin[0],
//         this.end[1] - this.begin[1],
//       );
//       ctx.fill();
//       ctx.stroke();
//     }
//   }
//
//   getData(width, height) {
//     return {
//       type: 'rectangle',
//       pixel: {begin: this.begin, end: this.end},
//       device: {
//         begin: _scale_point(this.begin, width, height),
//         end: _scale_point(this.end, width, height),
//       },
//     };
//   }
// }
